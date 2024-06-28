import {Post} from '../models/post.model.js';
import {User} from '../models/user.model.js';
import {Comment} from '../models/comment.model.js';
import {Likes} from '../models/likes.model.js';
import {Reply} from '../models/reply.model.js';
import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponce } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandeler.js';
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const createPost = asyncHandler(async (req, res) => {
    const { title="",content="", type="blog", visibility="public" } = req.body;
    let post;
        switch(type){
        case "photo":
            const imageFilePath = req.file?.path;
            if(!imageFilePath){
             throw new ApiError(400, "Image is required for photo post");
            }
            const uploadedImage= await uploadOnCloudinary(imageFilePath);
            if(!uploadedImage){
                throw new ApiError(500, "Failed to upload image on cloudinary");
            }
            post = await Post.create({
                title,
                type,
                visibility,
                assetURL:uploadedImage.secure_url,
                author:new mongoose.Types.ObjectId(req.user._id)
            });
            if(!post){
                throw new ApiError(500, "Failed to create post");
            }
            break;


        case "video":
            const videoFilePath = req.file?.path;
            if(!videoFilePath){
                throw new ApiError(400, "Video is required for vido post");
            }
            const uploadedVideo = await uploadOnCloudinary(videoFilePath);
            if(!uploadedVideo){
                throw new ApiError(500, "Failed to upload video on cloudinary");
            }
            post = await Post.create({
                title,
                type,
                visibility,
                assetURL:uploadedVideo.secure_url,
                author:new mongoose.Types.ObjectId(req.user._id)
            });
            if(!post){
                throw new ApiError(500, "Failed to create post");
            }
            break;

        case "pdf":
            const pdfFilePath = req.file?.path;
            if(!pdfFilePath){
            throw new ApiError(400, "PDF is required for pdf post");
            }
            const uploadedPdf= await uploadOnCloudinary(pdfFilePath);
            if(!uploadedPdf){
                throw new ApiError(500, "Failed to upload Pdf on cloudinary");
            }
            post= await Post.create({
                title,
                type,
                visibility,
                assetURL:uploadedPdf.secure_url,
                author:new mongoose.Types.ObjectId(req.user._id)
            });
            if(!post){
                throw new ApiError(500, "Failed to create post");
            }
            break;


        case "blog":
            if(!content){
                throw new ApiError(400, "Content is required for blog post");
            }
            if(!title){
                throw new ApiError(400, "Title is required for blog post");
            }
            if(content.length < 50){
                throw new ApiError(400, "Content is too  small for blog post");
            }
            post = await Post.create({
                title,
                content,
                type,
                visibility,
                author:new mongoose.Types.ObjectId(req.user._id)
            });
            if(!post){
                throw new ApiError(500, "Failed to create post");
            }
            break;
        default:
            throw new ApiError(400, "Invalid post type");
    }
    return res
    .status(201)
    .json(new ApiResponce(201,post, "Post created successfully"));


});
    
const forkPost = asyncHandler(async (req, res) => {
    const { postId,visibility } = req.body;
    if(!postId){
        throw  new ApiError(400, "post id is required");
    }
    const post = await Post.findById(postId);
    if(!post){
        throw new ApiError(404, "Post not found");
    }
    const forkedPost = await Post.create({
        title:post.title,
        content:post.content,
        type:post.type,
        visibility:visibility,
        author:new mongoose.Types.ObjectId(req.user._id),
        forkedFrom:post._id,
    });
    if(!forkedPost){
        throw new ApiError(500, "Failed to fork post");
    }
    return res
    .status(201)
    .json(new ApiResponce(201,forkedPost, "Post forked successfully"));


}); 

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { title, content, visibility } = req.body;
    if(!postId){
        throw new ApiError(400, "Post id is required");
    }
    if(!title && !content && !visibility){
        throw new ApiError(400, "At least one field is required to update post");
    }
    const post = await Post.findById(postId);
    if(!post){
        throw new ApiError(404, "Post not found");
    }
    if(post.author.toString() !== req.user._id.toString()){
        throw new ApiError(403, "You are not authorized to update this post");
    }
    post.title = title || post.title;
    if(post.type === "blog"){
        post.content = content || post.content;
    }
    post.visibility = visibility || post.visibility;
    const updatedPost = await post.save();
    if(!updatedPost){
        throw new ApiError(500, "Failed to update post");
    }
    return res
    .status(200)
    .json(new ApiResponce(200,updatedPost, "Post updated successfully"));

});

const deletePost = asyncHandler(async (req, res) => {   
    const { postId } = req.params;
    if(!postId){
        throw new ApiError(400, "Post id is required");
    }
    const post = await Post.findById(postId);
    if(!post){
        throw new ApiError(404, "Post not found");
    }
    if(post.author.toString() !== req.user._id.toString()){
        throw new ApiError(403, "You are not authorized to delete this post");
    }
    const deletedPost = await Post.findByIdAndDelete(postId);
    if(!deletedPost){
        throw new ApiError(500, "Failed to delete post");
    }

    await Comment.deleteMany({post:new mongoose.Types.ObjectId(postId)}); // delete all comments of this post
    await Post.deleteMany({forkedFrom:new mongoose.Types.ObjectId(postId)}); // delete all forked post of this post      
    await Likes.deleteMany({post:new mongoose.Types.ObjectId(postId)}); // delete all likes of this post
    await Reply.deleteMany({post:new mongoose.Types.ObjectId(postId)}); // delete all replies of this post
    
    return res
    .status(200)
    .json(new ApiResponce(200,{}, "Post deleted successfully"));

});





export {
    createPost,
    forkPost,
    updatePost,
    deletePost,
}