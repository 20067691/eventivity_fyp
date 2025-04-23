import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import CloseButton from "./CloseButton";

const API_BASE_URL = "https://rm394xj7yl.execute-api.eu-west-1.amazonaws.com/v1";

export default function CommentSection({ isOpen, onClose, postId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) {
            fetchComments();
        }
    }, [isOpen]);

    const fetchComments = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
            if (!response.ok) {
                throw new Error("Failed to fetch comments");
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error.message);
            setError("There was a problem fetching comments.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddComment = (newComment) => {
        setComments((prev) => [...prev, newComment]);
    };

    const handleDeleteComment = async (commentId) => {
        try {
          const res = await fetch(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`, {
            method: "DELETE",
          });
      
          if (!res.ok) throw new Error("Failed to delete comment");
      
          setComments((prev) => prev.filter((c) => c.commentId !== commentId));
        } catch (err) {
          console.error("Delete failed:", err.message);
          alert("Couldn't delete the comment.");
        }
      };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                <CloseButton onClick={onClose} />

                <h2 className="text-2xl font-bold text-[#552834] mb-4">Comments</h2>

                {loading ? (
                    <p className="text-gray-500">Loading comments...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <CommentList comments={comments} onDelete={handleDeleteComment} />
                )}

                <CommentForm postId={postId} onAddComment={handleAddComment} />

            </div>
        </div>
    );
} 
