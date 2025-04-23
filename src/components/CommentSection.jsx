import { useState } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import CloseButton from "./CloseButton";

export default function CommentSection({ isOpen, onClose, postId }) {
    const [comments, setComments] = useState([
        { commentId: '1', username: 'Dean', content: 'Awesome post!', timestamp: '2025-04-22' },
        { commentId: '2', username: 'Rory', content: 'Really helpful!', timestamp: '2025-04-22' }
    ]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                <CloseButton onClick={onClose} />

                <h2 className="text-2xl font-bold text-[#552834] mb-4">Comments</h2>

                <CommentList comments={comments} />

                <CommentForm
                    postId={postId}
                    onAddComment={(newComment) => setComments((prev) => [...prev, newComment])}
                />
            </div>
        </div>
    );
}
