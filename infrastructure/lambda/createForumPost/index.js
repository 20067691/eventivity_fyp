import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const postsTable = "EventivityPosts";
const commentsTable = "EventivityComments";

export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event));

  let body;
  let statusCode = 200;

  try {
    switch (event.routeKey) {

      // Create a new post
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
            timestamp: new Date().toISOString(),
          },
        }));
        body = { message: "Post created successfully" };
        break;

      // Fetch all posts
      case "GET /posts":
        const allPosts = await dynamo.send(new ScanCommand({
          TableName: postsTable,
        }));
        body = allPosts.Items;
        break;

      // Create a comment for a post
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

      // Get all comments for a post
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

      // Unsupported routes
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
