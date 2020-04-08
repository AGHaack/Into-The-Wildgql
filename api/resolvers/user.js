const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');

const User = require('../database/models/user');
const Adventure = require('../database/models/adventure');
const { isAuthenticated } = require('./middleware');
const PubSub = require('../subscription');
const { userEvents } = require('../subscription/events');

module.exports = {
    Query: {
        user: combineResolvers(isAuthenticated, async (_, __, { email }) => {
            try {
                const user = await User.findOne({ email });
                if(!user) {
                    throw new Error('User not found.');
                }
                return user;
            } catch(error) {
                console.log(error);
                throw error;
            }
        })
    },
    Mutation: {
        signup: async (_, { input }) => {
            try {
                const user = await User.findOne({ email: input.email });
                if(user) {
                    throw new Error('Email already in use.');
                }
                const hashPass = await bycrypt.hash(input.password, 12);
                const newUser = new User({ ...input, password: hashPass });
                const result = await newUser.save();
                PubSub.publish(userEvents.USER_CREATED, {
                    userCreated: result
                });
                return result;
            } catch(error) {
                console.log(error);
                throw error;
            }
        },
        login: async (_, { input }) => {
            try {
                const user = await User.findOne({ email: input.email });
                if(!user) {
                    throw new Error('User not found');
                }
                const isPasswordValid = await bycrypt.compare(input.password, user.password);
                if(!isPasswordValid) {
                    throw new Error('Wrong password');
                }
                const secret = process.env.JWT_SECRET_KEY || 'poop';
                const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1d' });
                return { token };
            } catch(error) {
                console.log(error);
                throw error;
            }
        }
    },
    Subscription: {
        userCreated: {
            subscribe: () => PubSub.asyncIterator(userEvents.USER_CREATED)
        }
    },
    User: {
        adventures: async ({ id }) => {
            try {
                const adventures = await Adventure.find({ author: id });
                return adventures;
            } catch(error) {
                console.log(error);
                throw error;
            }
        }
    }
}