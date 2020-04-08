const { GraphQLDateTime } = require('graphql-iso-date');
const userResolver = require('./user');
const adventureResolver = require('./adventure');

const customDateScalerResolver = {
    Date: GraphQLDateTime
}

module.exports = [
    userResolver,
    adventureResolver,
    customDateScalerResolver
]