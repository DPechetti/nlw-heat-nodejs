import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import http from 'http'

import { router } from './routes'
import { Server } from 'socket.io'

const app = express()
app.use(cors())

const httpServer = http.createServer(app)

const socket = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

socket.on('connection', ({ id }) => {
  console.log(`User connected to socket ${id}`)
})

app.use(express.json())
app.use(router)

app.get('/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get('/signin/callback', (req, res) => {
  const { code } = req.query

  res.json(code)
})

export {httpServer, socket}