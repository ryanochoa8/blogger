import express from 'express'
import _blogService from '../services/blogService.js'
import { networkInterfaces } from 'os';



export default class BlogController {

  async getAllBlogs(req, res, next) {
    try {
      let Blogs = await _blogService.find()
      res.send(Blogs)
    } catch (error) {
      next(error)
    }
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

  async createBlog(req, res, next) {
    try {
      let blog = await _blogService.create(req.body)
      res.send(blog)
    } catch (error) { next(error) }
  }

  async editBlog(req, res, next) {
    try {
      let editedBlog = await _blogService.findByIdAndUpdate(req.params.planetId, req.body, { new: true })
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
      .get('', this.getAllBlogs)
      .get('/:blogId', this.getBlog)
      .post('', this.createBlog)
      .put('/:blogId', this.editBlog)
      .delete('/:blogId', this.deleteBlog)
  }


}