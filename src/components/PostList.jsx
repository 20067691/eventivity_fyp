// PsotList.jsx
import { useState } from "react";
import CommentSection from "./CommentSection";
import CommentButton from "./CommentButton";
import DeleteButton from "./DeleteButton";
import useTheme from "../hooks/useTheme";
import { useEvent } from "../context/EventContext";

const API_URL = import.meta.env.VITE_API_BASE_URL; 
export default function PostList({ posts, filter, setPosts }) {
  const { text } = useTheme();
  const { selectedEvent } = useEvent();

  const filteredPosts = posts.filter(post => {
    const eventMatch = selectedEvent ? post.eventId === selectedEvent.id : true;
    const tagMatch = filter === 'All' ? true : post.eventTag === filter;
    return eventMatch && tagMatch;
  });

  const [activePostId, setActivePostId] = useState(null);

  const handleOpenComments = (postId) => {
    setActivePostId(postId);
  };

  const handleCloseComments = () => {
    setActivePostId(null);
  };

  const handleDeletePost = async (postId) => {
    try {
      const res = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete post");

      // Remove it from the local state
      setPosts((prev) => prev.filter((p) => p.postId !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err.message);
      alert("Could not delete the post.");
    }
  };

  // const filteredPosts = posts;

  return (
    <div className="w-full max-w-2xl flex flex-col space-y-6 mt-8">
      <h2 className="text-2xl font-bold" style={{ color: text }}>Recent Posts</h2>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.postId} className="bg-white p-6 rounded-lg shadow-md relative">
            <h3 className="text-xl font-semiboldmb-2" style={{color: text}}>{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.content}</p>
            {post.mediaUrl && (
              <div className="mt-4">
                {post.mediaUrl.endsWith(".mp4") ? (
                  <video
                    controls
                    className="w-full max-h-64 rounded"
                    src={post.mediaUrl}
                  />
                ) : (
                  <img
                    src={post.mediaUrl}
                    alt="Uploaded content"
                    className="w-full max-h-64 object-cover rounded"
                  />
                )}
              </div>
            )}
            <div className="text-sm text-gray-500">
              Posted by <span className="font-semibold">{post.username}</span> on {post.timestamp}
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Event: {post.eventTag}
            </div>
            <CommentButton onClick={() => handleOpenComments(post.postId)} />
            <div className="absolute top-4 right-4">
              <DeleteButton onClick={() => handleDeletePost(post.postId)} />
            </div>

            {activePostId === post.postId && (
              <CommentSection
                isOpen={true}
                onClose={handleCloseComments}
                postId={post.postId}
              />
            )}

          </div>


        ))
      ) : (
        <p className="text-gray-500">No posts yet for this event.</p>
      )}
    </div>
  );
}
