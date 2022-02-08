import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.v2.config({
  cloud_name: 'db6aehiyh',
  api_key: '241666497432481',
  api_secret: process.env.STORAGE_KEY
});

export const uploadSVG = (svg: string) => {
  fs.writeFileSync('temp.svg', svg);
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload('temp.svg', (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(result);
    });
  });
}