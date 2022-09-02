import cloudinary from "./cloudinary";
import fs from "fs";
import { cloudinaryError } from "../utils/errors";

import dotenv from "dotenv";

dotenv.config();

/**
 * It uploads an image to Cloudinary, deletes the image from the local file system, and returns the URL
 * of the uploaded image
 * @param {string} fileString
 * @returns url of the uploaded image
 */
const uploadImage = async (fileString: string) => {
    try {
        if (!fs.existsSync(fileString)) {
            throw new Error("File not found!");
        }
        const uploadResponse = await cloudinary.uploader.upload(fileString, {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        });

        fs.unlinkSync(fileString);

        return uploadResponse.secure_url;
    } catch {
        fs.unlinkSync(fileString);
        throw cloudinaryError;
    }
};

export default uploadImage;
