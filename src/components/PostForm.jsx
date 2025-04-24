// PostForm.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import useTheme from '../hooks/useTheme';

const API_URL = "https://rm394xj7yl.execute-api.eu-west-1.amazonaws.com/v1/posts"

export default function PostForm({ posts, setPosts, fetchPosts }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [eventTag, setEventTag] = useState('Public'); 
  const { background, accent, text } = useTheme();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
  
    if (!title || !content) {
      alert('Title and content are required.');
      return;
    }

    const newPostId = uuidv4();
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: newPostId,
          title: title,
          content: content,
          username: user.username, // Pull from AuthContext!
          eventTag: eventTag, // From your filter/tag input
        }),
      });
  
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Post creation failed');
      }
    
      console.log('Post created successfully:', data.message);

      await fetchPosts(); // Fetch the latest posts after creating a new one
    
      // 🟢 Clear the form (optional)
      setTitle('');
      setContent('');
      setEventTag('Public');
      alert('Post created successfully!');
  
    } catch (error) {
      console.error('Post creation failed:', error.message);
      alert(error.message);
    }
  };
  

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4" style={{color: text}}>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 rounded focus:outline-none" style={{ borderColor: accent }}
        />

        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-3 h-40 rounded resize-none focus:outline-none" style={{ borderColor: accent }}
        ></textarea>

        <select
          value={eventTag}
          onChange={(e) => setEventTag(e.target.value)}
          className="border p-3 rounded focus:outline-none" style={{ borderColor: accent }}
        >
          <option value="Public">Public</option>
          <option value="Workshop1">Workshop1</option>
          <option value="Workshop2">Workshop2</option>
        </select>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          style={{ backgroundColor: text }}
          className="text-white py-2 px-6 rounded hover:bg-[#6a3b48] transition-colors"
        >
          Post
        </button>
      </form>
    </div>
  );
}
