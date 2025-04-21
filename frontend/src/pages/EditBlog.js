import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/blogs/${id}`);
        const blog = response.data;
        
        setTitle(blog.title);
        setContent(blog.content);
        setAuthor(blog.author);
        setTags(blog.tags ? blog.tags.join(', ') : '');
        setIsLoading(false);
      } catch (err) {
        setError('Could not fetch the blog');
        setIsLoading(false);
        console.error('Error fetching blog:', err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content || !author) {
      setError('Please fill in all required fields');
      return;
    }
    
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    
    const updatedBlog = {
      title,
      content,
      author,
      tags: tagsArray
    };
    
    setIsSaving(true);
    
    try {
      await axios.put(`http://localhost:5050/api/blogs/${id}`, updatedBlog);
      setIsSaving(false);
      navigate(`/blogs/${id}`);
    } catch (err) {
      setError('Failed to update blog');
      setIsSaving(false);
      console.error('Error updating blog:', err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-blog">
      <h2>Edit Blog</h2>
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
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
