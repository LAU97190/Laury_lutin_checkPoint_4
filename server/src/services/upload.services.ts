import type { Request } from "express";
import multer from "multer";

function ToPathFile(file: Express.Multer.File): string {
  const newPathName = `${Date.now()}-${Math.random()
    .toString(16)
    .substring(2, 15)}`;
  const extension = file.originalname.split(".").pop();

  return `${newPathName}.${extension}`;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/images/");
  },
  filename: (req, file, cb) => {
    cb(null, ToPathFile(file));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (_: Request, file, cb) => {
    if (!file.mimetype.includes("image")) {
      return cb(new Error("Seules les images sont autorisées"));
    }
    cb(null, true);
  },
});

export default upload;
