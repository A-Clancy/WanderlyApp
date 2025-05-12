import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret
};

cloudinary.config(credentials);

export const imageStore = {
  getAllImages: async function () {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function (imageBuffer) {
    // Save the buffer to a temporary file
    writeFileSync("./public/temp.img", imageBuffer);
    const result = await cloudinary.v2.uploader.upload("./public/temp.img");
    return result.url;
  },

  deleteImage: async function (publicId) {
    await cloudinary.v2.uploader.destroy(publicId, {});
  }
};
