// Forum.jsx
import { useAuth } from '../context/AuthContext';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import useTheme from '../hooks/useTheme'; 

const API_URL = "https://rm394xj7yl.execute-api.eu-west-1.amazonaws.com/v1/posts";

export default function Forum() {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('All');
  const {background, text} = useTheme();

  const availableFilters = ['All', 'Workshop1', 'Workshop2'];


  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6" style={{ backgroundColor: background }}>
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

  console.log('Current Posts:', posts);

  return (
    <div className="flex flex-col items-center justify-start min-h-screenp-6 space-y-8" style={{ backgroundColor: background }}>
      <PostForm setPosts={setPosts} posts={posts} fetchPosts={fetchPosts} />
      <Filter
        currentFilter={filter}
        setFilter={setFilter}
        availableFilters={availableFilters}
      />
      <PostList posts={posts} filter={filter} setPosts={setPosts} />
    </div>
  );
}

// This component serves as a placeholder for the Forum or Blog area of the Eventivity application.
// In a real application, you would likely implement features for user discussions, comments, or blog posts here.