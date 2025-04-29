
// CommentList.jsx
// This component displays a list of comments passed to it as props. Each comment is displayed with its content, username, and timestamp. If there are no comments, a message is displayed instead.
import DeleteButton from "./DeleteButton";

export default function CommentList({ comments, onDelete }) {
    if (!comments || comments.length === 0) {
      return <p className="text-gray-500">No comments yet. Be the first to contribute!</p>;
    }
  
    return (
      <div className="flex flex-col space-y-4 mb-6">
        {comments.map((comment) => (
          <div
            key={comment.commentId}
            className="border border-gray-200 p-4 rounded-md shadow-sm bg-gray-50"
          >
            <DeleteButton
              onClick={() => onDelete(comment.commentId)}
              consoleLogMessage={`Comment with ID ${comment.commentId} deleted`}
              />
            <p className="text-gray-800">{comment.content}</p>
            <div className="text-sm text-gray-500 mt-2">
              Posted by <span className="font-semibold">{comment.username}</span> on{" "}
              {new Date(comment.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    );
  }
  