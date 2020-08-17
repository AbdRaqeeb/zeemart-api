import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import folders from './folders';

/**
 *@desc upload photo to cloudinary
 * @returns {url} image url from cloudinary
 **/

export async function uploadImage(image, key) {
    let imageFile = image;

    //image file path
    const filePath = `./src/photos/image${Date.now()}.jpg`;

    //move image to the photo directory
    await imageFile.mv(filePath);

    // conditionals to know folder name t
    const folder_name = (key === 1) ? folders.product : folders.categories;

    //upload image to cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
        folder: folder_name
    });

    // Delete image on server after upload
    fs.unlinkSync(filePath);
    console.log('Photo deleted');

    return result.secure_url
}