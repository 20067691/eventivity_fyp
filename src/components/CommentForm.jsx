import { useState } from "react";
import { useAuth } from '../context/AuthContext';

export default function CommentForm({ postId, onAddComment }) {
  const [content, setContent] = useState("");
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    const newComment = {
      commentId: Date.now().toString(), // Temporary mock ID
      username: user.username, // Replace with user from context later
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    onAddComment(newComment); // Add comment to parent state
    setContent(""); // Clear input
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <textarea
        className="border border-gray-300 rounded p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#552834]"
        placeholder="Write a comment..."
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="self-end bg-[#552834] text-white py-1 px-4 rounded hover:bg-[#6a3b48] transition-colors"
      >
        Post Comment
      </button>
    </form>
  );
}
