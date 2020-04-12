const { skip } = require('graphql-resolvers');
const Adventure = require('../../database/models/adventure');
const { isValidObjectId } = require('../../database/util');


module.exports.isAuthenticated = (_, __, { email }) => {
    if(!email) {
        throw new Error('ACCESS DENIED! Please login.');
    }
    return skip;
}

module.exports.isAdventureOwner = async (_, { id }, { loggedInUserId }) => {
    try {
        if(!isValidObjectId(id)) {
            throw new Error('Invalid Adventure id');
        }
        const adventure = await Adventure.findById(id);
        if(!adventure) {
            throw new Error('Adventure not found');
        } else if(adventure.author.toString() !== loggedInUserId.toString()) {
            throw new Error('Not authorized as Adventure owner')
        }
        return skip;
    } catch(error) {
        console.log(error);
        throw error;
    }
}