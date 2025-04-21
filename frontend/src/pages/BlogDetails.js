import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/blogs/${id}`);
        setBlog(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Could not fetch the blog');
        setIsLoading(false);
        console.error('Error fetching blog:', err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setIsDeleting(true);
      
      try {
        await axios.delete(`http://localhost:5050/api/blogs/${id}`);
        setIsDeleting(false);
        navigate('/');
      } catch (err) {
        setError('Failed to delete the blog');
        setIsDeleting(false);
        console.error('Error deleting blog:', err);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="blog-details">
      <h2>{blog.title}</h2>
      <p className="author">Written by {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</p>
      
      {blog.tags && blog.tags.length > 0 && (
        <div className="tags">
          {blog.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
      
      <div className="content">
        {blog.content}
      </div>
      
      <div className="actions">
        <Link to={`/blogs/edit/${blog._id}`} className="button button-secondary">
          Edit
        </Link>
        <button 
          onClick={handleDelete} 
          className="button button-danger"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
