const DB_NAME = 'sharelearner';
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_URI;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const DEFAULT_AVATAR = 'https://res.cloudinary.com/dxkufsejm/image/upload/v1626820134/sharelearner/default-avatar.png';
const DEFAULT_COVER_PHOTO= 'https://res.cloudinary.com/dxkufsejm/image/upload/v1626820134/sharelearner/default-cover-photo.png';


export { 
    DB_NAME, 
    PORT, 
    DB_URL, 
    CLOUDINARY_CLOUD_NAME, 
    CLOUDINARY_API_KEY, 
    CLOUDINARY_API_SECRET,
    DEFAULT_AVATAR,
    DEFAULT_COVER_PHOTO,
};
