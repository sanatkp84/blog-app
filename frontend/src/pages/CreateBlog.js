import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content || !author) {
      setError('Please fill in all required fields');
      return;
    }
    
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    
    const blog = {
      title,
      content,
      author,
      tags: tagsArray
    };
    
    setIsLoading(true);
    
    try {
      await axios.post('http://localhost:5050/api/blogs', blog);
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setError('Failed to create blog');
      setIsLoading(false);
      console.error('Error creating blog:', err);
    }
  };

  return (
    <div className="create-blog">
      <h2>Add a New Blog</h2>
      {error && <div className="error">{error}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated):</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        
        <button 
          type="submit" 
          className="button button-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Adding Blog...' : 'Add Blog'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
