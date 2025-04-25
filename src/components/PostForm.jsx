// PostForm.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import useTheme from '../hooks/useTheme';
import { useEvent } from '../context/EventContext';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/posts`;

export default function PostForm({ posts, setPosts, fetchPosts }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [eventTag, setEventTag] = useState('Public');
  const { accent, text } = useTheme();
  const { selectedEvent } = useEvent();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadng, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);


  const uploadFile = async (file) => {
    try {
      setUploading(true);

      // Get the fike type from the file object
      const fileType = file.type;
      console.log('Selected file type:', fileType);

      // Request a pre-signed URL from your backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload-url?type=${encodeURIComponent(fileType)}`);
       
      if (!response.ok) {
        const errText = await response.text();
        console.error('Error fetching upload URL:', errText);
        throw new Error('Failed to get upload URL');
      }
      console.log("Response from upload URL request:", `/upload-url?type=${file.type}`);
      // Parse the response to get the upload URL and file URL
      const { uploadUrl, fileUrl} = await response.json();

      // Upload the file to S3 using the pre-signed URL
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': fileType,
        },
        body: file,
      });

      console.log('File uploaded successfully:', fileUrl);
      setUploadedFileUrl(fileUrl); // Store the uploaded file URL
      setUploading(false);
      return fileUrl; // Return the file URL for use in the post creation
    } catch (error) {
      console.error('File upload failed:', error);
      setUploading(false);
      setError('File upload failed. Please try again.');
      return null; // Return null if the upload fails

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !content) {
      alert('Title and content are required.');
      return;
    }

    let mediaUrl = null;
    if (selectedFile) {
      mediaUrl = await uploadFile(selectedFile); // Upload the file and get the URL
      if (!mediaUrl) {
        alert('File upload failed. Please try again.');
        return;
      }
    }
    // If the file upload is successful, proceed to create the post

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
          eventId: selectedEvent?.id, 
          mediaUrl: mediaUrl, // URL of the uploaded file
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Post creation failed');
      }

      console.log('Post created successfully:', data.message);

      await fetchPosts(); // Fetch the latest posts after creating a new one

      // Clear the form (optional)
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
      <h2 className="text-2xl font-bold mb-4" style={{ color: text }}>Create a New Post</h2>
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

        <div className="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36 mx-auto">
          <label htmlFor="upload" className="flex flex-col items-center gap-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 fill-white stroke-indigo-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-gray-600 font-medium">Upload file</span>
          </label>
          <input
            id="upload"
            type="file"
            accept="image/jpeg,image/png,video/mp4"
            className="hidden"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>

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
