import { useState } from 'react';

export default function PostList() {
  // Temporary dummy posts for now
  const [posts] = useState([
    {
      postId: '1',
      title: 'Welcome to the Eventivity Forum!',
      content: 'Feel free to share your thoughts and media from the event.',
      username: 'admin',
      timestamp: '2025-04-18 10:00',
    },
    {
      postId: '2',
      title: 'Great Workshop Today!',
      content: 'Loved the Python for Beginners session. Really well organized!',
      username: 'dean',
      timestamp: '2025-04-18 13:30',
    },
  ]);

  return (
    <div className="w-full max-w-2xl flex flex-col space-y-6 mt-8">
      <h2 className="text-2xl font-bold text-[#552834]">Recent Posts</h2>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.postId} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#552834] mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="text-sm text-gray-500">
              Posted by <span className="font-semibold">{post.username}</span> on {post.timestamp}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No posts yet. Be the first to create one!</p>
      )}
    </div>
  );
}
