import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // ✅ Import auth context
import { v4 as uuidv4 } from 'uuid';

export default function PostForm({ posts, setPosts }) {
  const { user } = useAuth(); // ✅ Get user info
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError('Both Title and Content are required.');
      return;
    }

    const newPost = {
      postId: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      username: user?.username || 'anonymous', // ✅ Pull username from context
      timestamp: new Date().toLocaleString(),
    };

    setPosts([newPost, ...posts]);
    setError('');
    setTitle('');
    setContent('');
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#552834] mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#552834]"
        />
        
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-3 h-40 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#552834]"
        ></textarea>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="bg-[#552834] text-white py-2 px-6 rounded hover:bg-[#6a3b48] transition-colors"
        >
          Post
        </button>
      </form>
    </div>
  );
}
