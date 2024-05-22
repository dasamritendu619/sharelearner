import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandeler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";


function isStrongPassword(password) {
    // Check if password length is at least 8 characters
    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }

    // Regular expressions to check if password contains required characters
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*]/;

    // Check if password contains at least one lowercase letter
    if (!lowerCaseRegex.test(password)) {
        return "Password must contain at least one lowercase letter";
    }

    // Check if password contains at least one uppercase letter
    if (!upperCaseRegex.test(password)) {
        return "Password must contain at least one uppercase letter";
    }

    // Check if password contains at least one digit
    if (!digitRegex.test(password)) {
        return "Password must contain at least one digit";
    }

    // Check if password contains at least one special character
    if (!specialCharRegex.test(password)) {
        return "Password must contain at least one special character";
    }

    // If all conditions pass, password is strong
    return true;
}


function validateEmail(email) {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Test the email against the regular expression
    return emailRegex.test(email);
}

function isValidUsername(inputString) {
    // Check if the string starts or ends with "-"
    if (inputString.startsWith('-') || inputString.endsWith('-')) {
      return "Username cannot start or end with '-'";
    }
    // Check if the string contains spaces, special characters (except "-"), or capital letters
    if (/[\sA-Z!@#$%^&*()_+={}[\]:;<>,.?~\\\/]/.test(inputString)) {
      return "Username can only contain lowercase letters, numbers, and hyphens";
    }
    // Check if the string starts with a number
    if (/^\d/.test(inputString)) {
      return "Username cannot start with a number";
    }
    // If all conditions are met, return true
    return true;
}

function generateUserVerificationToken({email,fullName,_id}) {
    const token = jwt.sign({email,fullName,_id},process.env.USER_VERIFICATION_TOKEN_SECRET,{expiresIn:process.env.USER_VERIFICATION_TOKEN_EXPIRY});
    return token;
}

const registerUser = asyncHandler(async(req,res)=>{
    // get username,email,password,fullName from req.body
    const {username,email,password,fullName} = req.body;
    // check if username,email,password,fullName exists or not
    if(!username || !email || !password || !fullName ){
        throw new ApiError(400,"All fields are required");
    }
    // validate password
    const passwordError = isStrongPassword(password);
    // if password is not strong
    if (passwordError !== true) {
        throw new ApiError(400,passwordError);
    }
    // validate email
    if (!validateEmail(email)) throw new ApiError(400,"Invalid email address");
    // validate username
    const usernameError = isValidUsername(username);
    if (usernameError !== true) {
        throw new ApiError(400,usernameError);
    }
    // check if user already exists
    const existeduser = await User.findOne({$or:[{username:username},{email:email}]});
    
    if (existeduser) {
        throw new ApiError(400,"User already exists");
    }
    // create user
    const user = await User.create({
        username,
        email,
        password,
        fullName
    });

    if (!user) {
        throw new ApiError(500,"Something went wrong while creating user");
    }
    
    const newUser = {
        username:user.username,
        email:user.email,
        fullName:user.fullName,
        _id:user._id
    }
    // send response
    return res
    .status(201)
    .json(new ApiResponce(201,newUser,"User created successfully"));
})
