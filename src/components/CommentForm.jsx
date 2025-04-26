import { useState } from "react";
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CommentForm({ postId, onAddComment }) {
    const [content, setContent] = useState("");
    const { user } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!content.trim()) return;
  
      const newComment = {
        username: user.username,
        content: content.trim(),
      };
  
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        });
  
        if (!response.ok) {
          throw new Error("Failed to submit comment");
        }
  
        const data = await response.json();
  
        // Add the comment locally
        onAddComment({
          ...newComment,
          commentId: data.commentId,
          timestamp: new Date().toISOString(),
        });
  
        setContent(""); // Clear form
      } catch (error) {
        console.error("Error submitting comment:", error.message);
        alert("There was a problem posting your comment.");
      }
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
