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

uploadImage: async function (imagefile) {
  const filename = `temp-${Date.now()}`; // unique name per upload
  writeFileSync(`./public/${filename}`, imagefile);
  const response = await cloudinary.v2.uploader.upload(`./public/${filename}`, {
    unique_filename: true,
    overwrite: false
  });
  return response.url;
},

  deleteImage: async function (publicId) {
    await cloudinary.v2.uploader.destroy(publicId, {});
  }
};
