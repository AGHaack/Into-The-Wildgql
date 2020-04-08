const mongoose = require('mongoose');

const adventureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    park: {
        type: String,
        required: true
    },
    parkLocation: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    adventureDate: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Adventure', adventureSchema);