import { CLOUDINARY_ASSET_FOLDER } from "../constants/cloudinaryConstants";
import { cloudinaryError } from "../utils/errors";
import { getImageCloudinaryId } from "../utils/getImageCloudinaryId";
import cloudinary from "./cloudinary";

/**
 * It takes image name, checks if it's a default image, if not, it deletes the image from cloudinary
 * @param {string} fileString
 * @returns {
 *   "result": "ok",
 *   "error": {
 *     "message": "Not Found",
 *     "http_code": 404
 *   }
 */
const deleteImage = async (fileString: string) => {
    try {
        const assetId = getImageCloudinaryId(fileString);
        const publicId = CLOUDINARY_ASSET_FOLDER + "/" + assetId;
        const deleteResponse = await cloudinary.uploader.destroy(publicId);
        return deleteResponse.result;
    } catch {
        throw cloudinaryError;
    }
};

export default deleteImage;
