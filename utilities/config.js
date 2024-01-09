require('dotenv').config();
// const cloudinary = require('cloudinary').v2;

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const SECRET = process.env.SECRET;
// const UPLOAD_PRESET = process.env.UPLOAD_PRESET || 'ml_default';

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

module.exports = {
    PORT,
    DATABASE_URL,
    SECRET,
    // cloudinary,
    // UPLOAD_PRESET,
};