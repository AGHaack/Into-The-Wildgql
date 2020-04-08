const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    adventures: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Adventure' }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);