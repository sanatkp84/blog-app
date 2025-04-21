import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  if (!blogs.length) {
    return <div className="empty-list">No blogs available</div>;
  }

  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <div className="blog-preview" key={blog._id}>
          <Link to={`/blogs/${blog._id}`}>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
