# GraphQL Express (Research)

[![License: LQL 1.0](https://img.shields.io/badge/License-LQL%201.0-brightgreen)](https://github.com/launchquest/license/blob/master/README.md) [![Status: Experimental](https://img.shields.io/badge/Status-Experimental-blue)](https://github.com/launchquest/license/blob/master/Experimental.md)

This repository contains an example implementation of a GraphQL API using Node.js and Express. It demonstrates how GraphQL can be used as an alternative to traditional REST APIs, offering several benefits in terms of efficiency, flexibility, and performance.

## GraphQL Overview

GraphQL is a query language and runtime for APIs that allows clients to request exactly the data they need. It provides a single endpoint for all data fetching and manipulation, as opposed to the multiple endpoints typically used in REST APIs.

## Key Concepts

### Schema

The GraphQL schema (src/schema.js) defines the types, queries, and mutations available in the API. It serves as a contract between the client and the server, specifying the structure and capabilities of the API.

#### Types

GraphQL uses a strongly typed system to define the data structures available in the API. In this example, we have three main types:

1. `User`: Represents a user with an ID, username, and password.
2. `AuthPayload`: Represents the response from a successful login, containing an authentication token and the logged-in user.
3. `Message`: Represents a message with an ID, sender, recipient, and content.

These types define the shape of the data that can be queried or mutated through the API.

#### Queries

Queries in GraphQL allow clients to fetch data from the server. In this example, we have two queries:

1. `getUser(username: String!)`: Retrieves a user by their username.
2. `getMessages`: Retrieves the messages for the authenticated user.

Queries are defined in the schema using the `type Query` syntax. They specify the name of the query, any arguments it accepts, and the return type.

#### Mutations

Mutations in GraphQL allow clients to modify data on the server. In this example, we have three mutations:

1. `registerUser(username: String!, password: String!)`: Registers a new user with the provided username and password.
2. `loginUser(username: String!, password: String!)`: Logs in a user with the provided credentials and returns an authentication token.
3. `sendMessage(recipient: String!, content: String!)`: Sends a message to the specified recipient.

Mutations are defined in the schema using the `type Mutation` syntax. They specify the name of the mutation, any arguments it accepts, and the return type.

The schema acts as a contract that defines the available operations and the structure of the data. It allows clients to know exactly what they can request and what they can expect in response. The server uses the schema to validate incoming requests and ensure that they adhere to the defined structure.

By defining types, queries, and mutations in the schema, GraphQL provides a clear and structured way to expose the capabilities of an API. This promotes a strong contract between the client and the server, enabling better collaboration and reducing the chances of misunderstandings or breaking changes.

### Resolvers

The root object in src/index.js contains the resolvers for the GraphQL queries and mutations. Resolvers are functions that retrieve or modify data based on the client's request. They are responsible for fetching data from databases, APIs, or other sources and returning it in the format specified by the schema.

Resolvers are the actual implementation of the queries and mutations defined in the schema. They are mapped to the corresponding fields in the schema and are executed when a client sends a request to the GraphQL server.

In this example, we have resolvers for the following queries and mutations:

#### Query Resolvers

1. `getUser`: Retrieves a user by their username from the `users` array.
2. `getMessages`: Retrieves the messages for the authenticated user from the `messages` array.

Query resolvers are responsible for fetching the requested data and returning it in the format specified by the schema. They can access any necessary data sources, such as databases or external APIs, to fulfill the request.

#### Mutation Resolvers

1. `registerUser`: Registers a new user by adding the provided username and password to the `users` array.
2. `loginUser`: Logs in a user by verifying the provided username and password against the `users` array. If the credentials are valid, it generates an authentication token using JSON Web Tokens (JWT) and returns it along with the user object.
3. `sendMessage`: Sends a message by adding a new message object to the `messages` array. It requires authentication and checks if the sender exists before creating the message.

Mutation resolvers are responsible for modifying data on the server based on the client's request. They can perform operations such as creating, updating, or deleting data in databases or other data sources.

Resolvers have access to the arguments passed in the GraphQL query or mutation, as well as the context object that can contain additional information like authentication tokens or database connections.

When a client sends a GraphQL request, the server matches the requested fields to the corresponding resolvers defined in the root object. It then executes the resolvers in the order specified by the query or mutation, passing the necessary arguments and context.

Resolvers can also be asynchronous, allowing them to handle operations that require I/O or external requests. They can return promises or use async/await syntax to handle asynchronous operations.

By implementing resolvers, developers have full control over how data is fetched and modified. They can apply business logic, perform data transformations, and integrate with various data sources to fulfill the client's request.

Resolvers are a crucial part of a GraphQL server, as they bridge the gap between the schema and the actual data. They provide the flexibility to retrieve and manipulate data from different sources and return it in the format expected by the client, ensuring a seamless and efficient data fetching experience.

### Authentication

This example uses JSON Web Tokens (JWT) for authentication. When a user logs in (/loginUser mutation), a token is generated and returned to the client. The client includes this token in the Authorization header for subsequent requests that require authentication. The server verifies the token to ensure the user is authorized to access the requested resources.

## Benefits of GraphQL

### Efficiency

GraphQL allows clients to request exactly the data they need, avoiding over-fetching or under-fetching. This reduces the amount of data transferred over the network, resulting in faster performance and lower bandwidth usage. In REST APIs, clients often receive more data than they need or have to make multiple requests to fetch all the required data.

### Flexibility

With GraphQL, clients have more control over the data they receive. They can specify the desired fields, traverse relationships between types, and even request data from multiple resources in a single request. This flexibility enables clients to adapt to changing requirements without relying on server-side changes.

### Strong Typing

GraphQL uses a strongly typed schema, which provides clarity and validation. The schema serves as a contract between the client and the server, ensuring that both parties have a clear understanding of the available data and operations. This helps catch errors early in the development process and provides better tooling and auto-completion.

## Example Usage

The repository includes example scripts to demonstrate the usage of the GraphQL API:

- `register.sh`: Registers a new user.
- `login.sh`: Logs in a user and retrieves an authentication token.
- `check.sh`: Retrieves the messages for the authenticated user.
- `send.sh`: Sends a message to a specified recipient.

These scripts interact with the GraphQL API using curl and showcase the different operations available.

## License

This project is licensed under the [Launch Quest License (LQL 1.0)](https://launchquest.co/lql-1.0.txt) and is free to use by solo developers and small business owners. For the full terms and conditions, please see the [LICENSE](LICENSE) file.
