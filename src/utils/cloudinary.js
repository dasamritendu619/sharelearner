import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
import { 
    CLOUDINARY_CLOUD_NAME, 
    CLOUDINARY_API_KEY, 
    CLOUDINARY_API_SECRET } 
    from '../constants.js';

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure:true
});


/////////////////////////
// Uploads an image file
/////////////////////////
const uploadFileOnCloudinary = async (imagePath) => {

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(filePath,{resource_type:"auto",folder:"/sharelerner"});
      fs.unlinkSync(imagePath);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
};
const deleteFileOnCloudinary=async(public_id)=>{
    try{
        const result= await cloudinary.uploader.destroy(public_id);
        return true;
    }catch(err){
        return false;
    }
}
export {uploadFileOnCloudinary,deleteFileOnCloudinary };