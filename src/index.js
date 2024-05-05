// Copyright 2024 Launch Quest Ltd - All Rights Reserved
// Unauthorized copying of this file, via any medium is
// strictly prohibited. Proprietary and confidential.

import dotenv from 'dotenv'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema.js'
import jwt from 'jsonwebtoken'

dotenv.config()

let users = []
let messages = []

const root = {
  registerUser: ({ username, password }) => {
    const user = { id: users.length + 1, username, password }
    users.push(user)
    return user
  },
  loginUser: ({ username, password }) => {
    const user = users.find(user => user.username === username && user.password === password)
    if (!user) throw new Error('Invalid username or password')
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return { token, user }
  },
  getUser: ({ username }) => users.find(user => user.username === username),
  sendMessage: ({ recipient, content }, req) => {
    if (!req.userId) throw new Error('Unauthorized')
    const senderUser = users.find(user => user.id === req.userId)
    if (!senderUser) throw new Error('Sender not found')
    const message = { id: messages.length + 1, sender: senderUser.username, recipient, content }
    messages.push(message)
    return message
  },
  getMessages: (args, req) => {
    if (!req.userId) throw new Error('Unauthorized')
    return messages.filter(message => message.recipient === users.find(user => user.id === req.userId).username)
  }
}

const app = express()

app.use(async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.userId = decoded.userId
    } catch (e) {
      console.log('Authentication Error: Token is invalid or expired')
      res.status(401).send('Unauthorized')
      return
    }
  }
  next()
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`)
})
