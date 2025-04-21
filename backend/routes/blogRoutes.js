const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// GET all blogs
router.get('/', blogController.getAllBlogs);

// GET a single blog
router.get('/:id', blogController.getBlogById);

// POST a new blog
router.post('/', blogController.createBlog);

// PUT update a blog
router.put('/:id', blogController.updateBlog);

// DELETE a blog
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
