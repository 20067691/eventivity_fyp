
export default function PostList({ posts }) {
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

