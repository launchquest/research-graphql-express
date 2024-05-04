// Copyright 2024 Launch Quest Ltd - All Rights Reserved
// Unauthorized copying of this file, via any medium is
// strictly prohibited. Proprietary and confidential.

import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema.js'

const app = express()

const root = {
  hello: () => 'Hello world!'
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true // Enable GraphiQL, a web-based IDE for exploring GraphQL
}))

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`)
})