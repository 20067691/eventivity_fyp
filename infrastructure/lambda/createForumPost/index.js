import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  QueryCommand,
  DeleteCommand,
  BatchWriteCommand,
  GetCommand
} from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const postsTable = "EventivityPosts";
const commentsTable = "EventivityComments";

const s3 = new S3Client({ region: "eu-west-1" });
const BUCKET_NAME = "eventivity-posts-media";


export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event));

  let body;
  let statusCode = 200;

  try {
    switch (event.routeKey) {

      //  Create a new post
      case "POST /posts":
        const postData = JSON.parse(event.body);
        await dynamo.send(new PutCommand({
          TableName: postsTable,
          Item: {
            postId: postData.postId,
            title: postData.title,
            content: postData.content,
            username: postData.username,
            eventTag: postData.eventTag || 'Public',
            eventId: postData.eventId || 'Unknown',
            mediaUrl: postData.mediaUrl || null,
            timestamp: new Date().toISOString(),
          },
        }));
        body = { message: "Post created successfully" };
        break;

      //  Fetch all posts
      case "GET /posts":
        const allPosts = await dynamo.send(new ScanCommand({
          TableName: postsTable,
        }));
        body = allPosts.Items;
        break;

      //  Create a comment for a post
      case "POST /posts/{postId}/comments":
        const postId = event.pathParameters.postId;
        const commentData = JSON.parse(event.body);
        const commentId = Date.now().toString(); // or uuidv4()

        await dynamo.send(new PutCommand({
          TableName: commentsTable,
          Item: {
            postId: postId,
            commentId: commentId,
            content: commentData.content,
            username: commentData.username,
            timestamp: new Date().toISOString(),
          }
        }));

        body = { message: "Comment created successfully", commentId };
        break;

      //  Get all comments for a post
      case "GET /posts/{postId}/comments":
        const getCommentsPostId = event.pathParameters.postId;

        const commentResult = await dynamo.send(new QueryCommand({
          TableName: commentsTable,
          KeyConditionExpression: "postId = :pid",
          ExpressionAttributeValues: {
            ":pid": getCommentsPostId,
          },
          ScanIndexForward: true // Sort ascending by commentId
        }));

        body = commentResult.Items;
        break;

      case "DELETE /posts/{postId}":
        const postIdToDelete = event.pathParameters.postId;

        // Get the post to retrieve mediaUrl
        const post = await dynamo.send(new GetCommand({
          TableName: postsTable,
          Key: { postId: postIdToDelete }
        }));

        // Delete associated media from S3 if it exists
        if (post.Item?.mediaUrl) {
          const key = new URL(post.Item.mediaUrl).pathname.slice(1); // removes leading slash
          console.log("Deleting media from S3:", key);
          await s3.send(new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key
          }));
        }

        // Delete post
        await dynamo.send(new DeleteCommand({
          TableName: postsTable,
          Key: { postId: postIdToDelete }
        }));

        // Get related comments
        const commentQuery = await dynamo.send(new QueryCommand({
          TableName: commentsTable,
          KeyConditionExpression: "postId = :pid",
          ExpressionAttributeValues: {
            ":pid": postIdToDelete
          }
        }));

        // Batch delete
        const deleteRequests = commentQuery.Items.map((item) => ({
          DeleteRequest: {
            Key: {
              postId: item.postId,
              commentId: item.commentId,
            },
          },
        }));

        if (deleteRequests.length > 0) {
          await dynamo.send(new BatchWriteCommand({
            RequestItems: {
              [commentsTable]: deleteRequests,
            },
          }));
        }

        body = { message: "Post and its comments deleted successfully." };
        break;

      // Delete a single comment
      case "DELETE /posts/{postId}/comments/{commentId}":
        const { postId: delPostId, commentId: delCommentId } = event.pathParameters;
        console.log("Deleted:", event.pathParameters);
        await dynamo.send(new DeleteCommand({
          TableName: commentsTable,
          Key: {
            postId: delPostId,
            commentId: delCommentId
          }
        }));

        body = { message: "Comment deleted successfully." };
        break;



      case "GET /upload-url":
        const contentType = event.queryStringParameters?.type || "image/jpeg"; // Read MIME type from frontend
        let extension = "jpg";

        // Match extension based on content type
        if (contentType === "image/png") extension = "png";
        if (contentType === "video/mp4") extension = "mp4";

        console.log("Requested file type:", contentType); // Console log the file type for debugging

        const fileName = `uploads/${Date.now()}-${Math.floor(Math.random() * 1000)}.${extension}`;

        const command = new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: fileName,
          ContentType: contentType,
        });

        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

        body = {
          uploadUrl: signedUrl,
          fileUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
        };
        break;


      // unsupported routes
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    console.error("Error:", err);
    statusCode = 400;
    body = { error: err.message };
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
