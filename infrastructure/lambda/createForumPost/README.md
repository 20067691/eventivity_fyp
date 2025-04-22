# CreateForumPost Lambda

This Lambda function accepts new forum post data from the frontend and inserts it into the DynamoDB table `EventivityPosts`.

## Expected Request Body

```json
{
  "title": "Post Title",
  "content": "Post Content",
  "username": "Username",
  "eventTag": "Workshop1" // Optional, defaults to Public
}
