import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogList from '../components/BlogList';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/blogs');
        setBlogs(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Could not fetch the blogs');
        setIsLoading(false);
        console.error('Error fetching blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="home">
      <h2>All Blogs</h2>
      {error && <div className="error">{error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <BlogList blogs={blogs} />
      )}
    </div>
  );
};

export default Home;
