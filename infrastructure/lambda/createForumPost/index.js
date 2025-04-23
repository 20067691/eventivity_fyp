import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "EventivityPosts";

export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event));

  let body;
  let statusCode = 200;

  try {
    switch (event.routeKey) {
      case "POST /posts":
        const requestJSON = JSON.parse(event.body);
        await dynamo.send(new PutCommand({
          TableName: tableName,
          Item: {
            postId: requestJSON.postId,
            title: requestJSON.title,
            content: requestJSON.content,
            username: requestJSON.username,
            eventTag: requestJSON.eventTag || 'Public',
            timestamp: new Date().toISOString(),
          },
        }));
        body = { message: `Post created successfully.` };
        break;

      case "GET /posts":
        const data = await dynamo.send(new ScanCommand({ TableName: tableName }));
        body = data.Items;
        break;

      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    console.error('Error:', err);
    statusCode = 400;
    body = err.message;
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    },
  };
};