const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        user: User
    }

    extend type Mutation {
        signup(input: signupInput): User
        login(input: loginInput): Token
    }

    input loginInput {
        email: String!
        password: String!
    }

    input signupInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        adventures: [Adventure!]
        createdAt: Date!
        updatedAt: Date!
    }

    type Token {
        token: String!
    }

    extend type Subscription {
        userCreated: User
    }
`;