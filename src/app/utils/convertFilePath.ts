import { NextFunction, Response } from 'express';

// Middleware to convert file path to a URL-friendly path
const convertFilePath = (req: any, res: Response, next: NextFunction) => {
  // Handle image file path
  if (req.files && req.files['image'] && req.files['image'][0]) {
    const fullPath = req.files['image'][0].path;
    const relativePath = fullPath.split('public')[1];
    req.files['image'][0].path = relativePath.replace(/\\/g, '/'); // Save the URL-friendly path
  }

  // Handle product images file paths
  if (req.files && req.files['images']) {
    req.files['images'].forEach((file: any) => {
      const fullPath = file.path;
      const relativePath = fullPath.split('public')[1];
      file.path = relativePath.replace(/\\/g, '/'); // Save the URL-friendly path
    });
  }

  next(); // Proceed to the next middleware/controller
};

export default convertFilePath;
