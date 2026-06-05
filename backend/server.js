import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Comment from './models/Comment.js';

// Routes imports
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import uploadRoutes from './routes/upload.js';
import commentRoutes from './routes/comments.js';

// Seeder import
import { seedDatabase } from './seed.js';

// Configure dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import handleCommentSocket from './socket/commentSocket.js';

// Create HTTP Server and Socket.io instance
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust to match frontend URL in production
    methods: ['GET', 'POST']
  }
});

// Initialize WebSocket Events
handleCommentSocket(io);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure uploads folder exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded static files
app.use('/uploads', express.static(uploadsDir));

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/comments', commentRoutes);

// Health Check API status ping
app.get('/api/status', (req, res) => {
  res.json({
    status: 'healthy',
    time: new Date().toISOString(),
    dbConnected: mongoose.connection.readyState === 1
  });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendBuild = path.join(process.cwd(), '..', 'frontend', 'dist');
  app.use(express.static(frontendBuild));
  
  // Serve index.html for any SPA routes that do not start with /api or /uploads
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(frontendBuild, 'index.html'));
  });
} else {
  // Root fallback route
  app.get('/', (req, res) => {
    res.send('ToonVerse API Server is running...');
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err.stack);
  res.status(500).json({
    message: err.message || 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// Connect to MongoDB & Start Server
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/toonverse';

console.log('Connecting to MongoDB...');
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('🎉 MongoDB connected successfully!');
    // Trigger seeder
    await seedDatabase();
    
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('⚠️ Running server with local memory storage fallback for development...');
    
    // Fallback listening so server starts even without MongoDB running
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${PORT} (Database offline)`);
      console.log('👉 Please start MongoDB and restart the server to enable persistent database storage.');
    });
  });
