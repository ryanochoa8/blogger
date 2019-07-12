import express from "express"
import bp from "body-parser"
import "./db/dbconfig"

import BlogController from "./controllers/blogController.js";

let port = 3000

let server = express()

server.use(bp.json({ limit: '50mb' }))

server.use('/api/blogs', new BlogController().router)
server.use('/', express.static(__dirname + '/../public'))

server.use((error, req, res, next) => {
  res.status(error.status || 400).send(error)
})

server.listen(port, () => {
  console.log("Server running on port:", port)
})