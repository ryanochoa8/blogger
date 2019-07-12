import express from 'express'
import _blogService from '../services/blogService.js'
import { networkInterfaces } from 'os';



export default class BlogController {

  async getBlogBySlug(req, res, next) {
    try {
      if (!req.query.slug) {
        return next()
      }
      let blog = await _blogService.findOne({ slug: req.query.slug })
      if (!blog) {
        return res.status(400).send("No blog by that slug")
      }
      res.send(blog)
    } catch (error) { next(error) }
  }

  async getBlogsByTags(req, res, next) {
    try {
      if (!req.query.tags) {
        return next()
      }
      let blogs = await _blogService.find({ tags: { $in: [req.query.tags] } })
      res.send(blogs)
    } catch (error) { next(error) }
  }

  async getBlog(req, res, next) {
    try {
      let blog = await _blogService.findById(req.params.blogId)
      if (!blog) {
        return res.status(400).send("This is no the Blog you are looking for...")
      }
      res.send(blog)
    } catch (error) { next(error) }
  }

  async getAllBlogs(req, res, next) {
    try {
      let Blogs = await _blogService.find()
      res.send(Blogs)
    } catch (error) {
      next(error)
    }
  }
  async createBlog(req, res, next) {
    try {
      let blog = await _blogService.create(req.body)
      res.send(blog)
    } catch (error) { next(error) }
  }

  async editBlog(req, res, next) {
    try {
      let editedBlog = await _blogService.findByIdAndUpdate(req.params.blogId, req.body, { new: true })
      res.send(editedBlog)
    } catch (error) { next(error) }
  }

  async deleteBlog(req, res, next) {
    try {
      let deletedBlog = await _blogService.findByIdAndDelete(req.params.blogId)
      res.send("Blog Deleted")
    } catch (error) { next(error) }
  }

  constructor() {
    this.router = express.Router()
      // Retrieve blogs by query for title(slug) (.get findOne()) ANCHOR 
      .get('', this.getBlogBySlug)
      // Retrieve all blogs by query for a tag (.get by find()) ANCHOR  
      .get('', this.getBlogsByTags)
      .get('/:blogId', this.getBlog)
      .get('', this.getAllBlogs)
      .post('', this.createBlog)
      .put('/:blogId', this.editBlog)
      .delete('/:blogId', this.deleteBlog)
  }

  // Retrieve all blogs (.get) ANCHOR 
  // Retrieve blogs by query for title(slug) (.get findOne()) ANCHOR 
  // Retrieve all blogs by query for a tag (.get by find()) ANCHOR  
  // Post a blog ANCHOR 
  // Retrieve a blog by id  (.get) ANCHOR 
  // Edit a blog (.put) ANCHOR 
  // Delete a blog (.delete) ANCHOR 


}