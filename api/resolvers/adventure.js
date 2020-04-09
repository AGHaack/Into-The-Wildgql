const { combineResolvers } = require('graphql-resolvers');

const Adventure = require('../database/models/adventure');
const User = require('../database/models/user');
const { isAuthenticated, isAdventureOwner } = require('./middleware');
const { stringToBase64, base64ToString } = require('../helper');

module.exports = {
    Query: {
        adventures: combineResolvers(isAuthenticated, async (_, { cursor, limit=10 }, { loggedInUserId }) => {
            try {
                const query = { author: loggedInUserId };
                if(cursor){
                    query['_id'] = {
                        '$lt': base64ToString(cursor)
                    }
                }
                let adventures = await Adventure.find(query).sort({ _id: -1 }).limit(limit + 1);
                const hasNextPage = adventures.length > limit;
                adventures = hasNextPage ? adventures.slice(0, -1) : adventures;
                return {
                    adventureFeed: adventures,
                    pageInfo: {
                        nextPageCursor: hasNextPage ? stringToBase64(adventures[adventures.length-1].id) : null,
                        hasNextPage
                    }
                }
            } catch(error) {
                console.log(error);
                throw error;
            }
        }),
        allAdventures: combineResolvers(isAuthenticated, async (_, { cursor, limit }) => {
            try {
                let adventures = {};
                if(cursor) {
                    adventures = await Adventure.find({ _id: {'$lt': base64ToString(cursor)}}).sort({ _id: -1 }).limit(limit+1);
                } else {
                    adventures = await Adventure.find().sort({ _id: -1 }).limit(limit+1);
                }
                const hasNextPage = adventures.length > limit;
                adventures = hasNextPage ? adventures.slice(0, -1) : adventures;
                return {
                    adventureFeed: adventures,
                    pageInfo: {
                        nextPageCursor: hasNextPage ? stringToBase64(adventures[adventures.length-1].id) : "No next page",
                        hasNextPage
                    }
                }
            } catch(error) {
                console.log(error);
                throw error;
            }
        }),
        adventure: combineResolvers(isAuthenticated, isAdventureOwner, async (_, { input }, { email }) => {
            try {
                const adventure = await Adventure.findById(id);
                return adventure; 
            } catch(error) {
                console.log(error);
                throw error;
            }
        })
    },
    Mutation : {
        createAdventure: combineResolvers(isAuthenticated, async (_, { input }, { email }) => {
            try {
                const user = await User.findOne({ email });
                const adventure = new Adventure({ ...input, author: user.id });
                const result = await adventure.save();
                user.adventures.push(result.id);
                await user.save();
                return result;
            } catch(error) {
                console.log(error);
                throw error;
            }
        }),
        updateAdventure: combineResolvers(isAuthenticated, isAdventureOwner, async ( _,  { id, input }) => {
            try {
                const adventure = await Adventure.findByIdAndUpdate(id, { ...input }, { new: true });
                return adventure;
            } catch(error) {
                console.log(error);
                throw error;
            }
        }),
        deleteAdventure: combineResolvers(isAuthenticated, isAdventureOwner, async (_, { id }, { loggedInUserId }) => {
            try {
                const adventure = await Adventure.findByIdAndDelete(id);
                await User.updateOne({_id: loggedInUserId }, { $pull: { adventures: adventure.id }});
                return adventure;
            } catch(error) {
                console.log(error);
                throw error;
            }
        })
    },
    Adventure: {
        author: async (parent, _, { loaders }) => {
            try {
                const user = await loaders.user.load(parent.author.toString());
                return user;
            } catch(error) {
                console.log(error);
                throw error;
            }
        }
    }
}