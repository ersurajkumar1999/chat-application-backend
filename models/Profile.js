const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        default: null
    },
    gender: {
        type: String,
        trim: true,
        default: null
    },
    dateOfBirth: {
        type: String,
        trim: true,
        default: null
    },
    about: {
        type: String,
        trim: true,
        default: null
    },
    contactNumber: {
        type: Number,
        trim: true,
        default: null
    },
    image: {
        type: Number,
        trim: true,
        default: null
    },
    bioImage: {
        type: Number,
        trim: true,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Profile", profileSchema);