const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Create a DynamoDB client
const dynamodb = new AWS.DynamoDB.DocumentClient();

// DynamoDB table name
const TABLE_NAME = 'EventivityPosts';

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const { title, content, username, eventTag } = body;

    // Basic validation
    if (!title || !content || !username) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields.' }),
      };
    }

    const newPost = {
      postId: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      username: username.trim(),
      eventTag: eventTag || 'Public',
      timestamp: new Date().toISOString(),
    };

    await dynamodb.put({
      TableName: TABLE_NAME,
      Item: newPost,
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Post created successfully', postId: newPost.postId }),
    };

  } catch (error) {
    console.error('Error creating post:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
