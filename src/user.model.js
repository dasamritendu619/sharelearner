import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        index: "text",
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        minLength: 4,
        unique: true,
        index: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: 8,

    },
    refreshToken: {
        type: String
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['F', 'M', 'O'],
        default: 'M'
    },
    avatar: {
        type: String
    },
    coverPhoto: {
        type: String
    },
    education: {
        type: String
    },
    about: {
        type: String
    },
    address: {
        type: String
    },
    links: [
        {
            type: String
        }
    ],
    interest: [
        {
            type: String
        }
    ],



}, {
    timestamps: true
});
const user = mongoose.Model('user', userSchema);

export default user;
