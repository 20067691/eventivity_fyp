// PsotList.jsx
import { useState } from "react";
import CommentSection from "./CommentSection"; //
import CommentButton from "./CommentButton";


export default function PostList({ posts, filter }) {

  const filteredPosts = filter === 'All'
    ? posts
    : posts.filter(post => post.eventTag === filter);

  const [activePostId, setActivePostId] = useState(null);

  const handleOpenComments = (postId) => {
    setActivePostId(postId);
  };

  const handleCloseComments = () => {
    setActivePostId(null);
  };

  // const filteredPosts = posts;

  return (
    <div className="w-full max-w-2xl flex flex-col space-y-6 mt-8">
      <h2 className="text-2xl font-bold text-[#552834]">Recent Posts</h2>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.postId} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#552834] mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="text-sm text-gray-500">
              Posted by <span className="font-semibold">{post.username}</span> on {post.timestamp}
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Event: {post.eventTag}
            </div>
            <CommentButton onClick={() => handleOpenComments(post.postId)} />

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
