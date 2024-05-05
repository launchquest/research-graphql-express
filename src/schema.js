// Copyright 2024 Launch Quest Ltd - All Rights Reserved
// Unauthorized copying of this file, via any medium is
// strictly prohibited. Proprietary and confidential.

import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Message {
    id: ID!
    sender: String!
    recipient: String!
    content: String!
  }

  type Query {
    getUser(username: String!): User
    getMessages: [Message]
  }

  type Mutation {
    registerUser(username: String!, password: String!): User
    loginUser(username: String!, password: String!): AuthPayload
    sendMessage(recipient: String!, content: String!): Message
  }
`)

export default schema
