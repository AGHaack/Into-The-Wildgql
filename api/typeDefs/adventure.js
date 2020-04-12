const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        adventures(cursor: String, limit: Int): AdventureFeed!
        adventure(id: ID!): Adventure
        userAdventure(id: ID!): Adventure
        allAdventures(cursor: String, limit: Int): AdventureFeed!
    }

    type AdventureFeed {
        adventureFeed: [Adventure!]
        pageInfo: PageInfo!
    }

    type PageInfo {
        nextPageCursor: String!
        hasNextPage: Boolean!
    }

    input createAdventureInput {
        title: String!
        park: String!
        parkLocation: String!
        activity: String!
        adventureDate: String!
        post: String!
        rating: Int!
        imgPublicId: String
    }

    input updateAdventureInput {
        title: String
        park: String
        parkLocation: String
        activity: String
        adventureDate: String
        post: String
        rating: Int
        imgPublicId: String
    }

    extend type Mutation {
        createAdventure(input: createAdventureInput!): Adventure
        updateAdventure(input: updateAdventureInput!): Adventure
        deleteAdventure(id: ID!): Adventure
    }

    type Adventure {
        id: ID!
        title: String!
        park: String!
        parkLocation: String!
        activity: String!
        adventureDate: String!
        post: String!
        rating: Int!
        author: User!
        imgPublicId: String
        createdAt: Date!
        updatedAt: Date!
    }
`;