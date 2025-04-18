import { useAuth } from '../context/AuthContext';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Forum() {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F4F4] p-6">
        <h2 className="text-2xl font-bold text-[#552834] mb-4">Forum Access Restricted</h2>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Please sign in to view and create forum posts.
        </p>
        <Link
          to="/signin"
          className="bg-[#552834] text-white px-6 py-2 rounded hover:bg-[#6a3b48] transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#F7F4F4] p-6 space-y-8">
      <PostForm setPosts={setPosts} posts={posts} />
      <PostList posts={posts} />
    </div>
  );
}

// This component serves as a placeholder for the Forum or Blog area of the Eventivity application.
// In a real application, you would likely implement features for user discussions, comments, or blog posts here.