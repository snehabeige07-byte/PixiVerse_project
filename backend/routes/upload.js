import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Ensure upload directories exist
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const COVERS_DIR = path.join(process.cwd(), 'uploads', 'covers');
const CHAPTERS_DIR = path.join(process.cwd(), 'uploads', 'chapters');

createDirectory(COVERS_DIR);
createDirectory(CHAPTERS_DIR);

// Multer storage configurations
const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, COVERS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `cover-${uniqueSuffix}${ext}`);
  },
});

const chapterStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, CHAPTERS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `page-${uniqueSuffix}${ext}`);
  },
});

// File filter (accept images only)
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only image files are allowed!'), false);
};

const uploadCover = multer({
  storage: coverStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const uploadPages = multer({
  storage: chapterStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit per page
});

// @desc    Upload single book cover image
// @route   POST /api/upload/cover
// @access  Private/Admin
router.post('/cover', protect, adminOnly, uploadCover.single('cover'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const relativePath = `/uploads/covers/${req.file.filename}`;
  res.json({ coverUrl: relativePath });
}, (error, req, res, next) => {
  res.status(400).json({ message: error.message });
});

// @desc    Upload multiple chapter pages
// @route   POST /api/upload/pages
// @access  Private/Admin
router.post('/pages', protect, adminOnly, uploadPages.array('pages', 50), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  // Sort files by their original name to ensure page ordering is correct
  const sortedFiles = [...req.files].sort((a, b) => {
    return a.originalname.localeCompare(b.originalname, undefined, { numeric: true, sensitivity: 'base' });
  });

  const relativePaths = sortedFiles.map(file => `/uploads/chapters/${file.filename}`);
  res.json({ pageUrls: relativePaths });
}, (error, req, res, next) => {
  res.status(400).json({ message: error.message });
});

export default router;
