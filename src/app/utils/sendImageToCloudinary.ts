import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import AppError from '../errors/AppError';
import fs from 'fs';

cloudinary.config({
    cloud_name: 'dczoi2kkg',
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret
});

export const sendImageToCloudinary = async (imageName: string, path: string) => {
    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            path, {
            public_id: imageName,
        }
        )
        .catch((error) => {
            throw new AppError(400, error)
        });

    fs.unlink(path, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File is deleted.");
        }
    })
    return uploadResult;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/uploads")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage: storage })