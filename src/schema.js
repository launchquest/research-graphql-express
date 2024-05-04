// Copyright 2024 Launch Quest Ltd - All Rights Reserved
// Unauthorized copying of this file, via any medium is
// strictly prohibited. Proprietary and confidential.

import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

export default schema