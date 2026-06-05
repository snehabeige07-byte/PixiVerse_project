import Comment from '../models/Comment.js';

const handleCommentSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`[Socket] User Connected: ${socket.id}`);

    // Join a specific room based on the comic ID AND chapter ID
    socket.on('join_room', ({ comicId, chapterId }) => {
      const room = `${comicId}_${chapterId}`;
      socket.join(room);
      console.log(`[Socket] User ${socket.id} joined room: ${room}`);
    });

    // Handle receiving and saving a new comment (main or nested)
    socket.on('send_comment', async (data) => {
      try {
        const { comicId, chapterId, username, text, parentId } = data;

        // Basic validation
        if (!comicId || !chapterId || !username || !text) {
          console.error('[Socket] Missing required fields for comment');
          return;
        }

        const newComment = new Comment({
          comicId,
          chapterId,
          username,
          text,
          parentId: parentId || null
        });

        const savedComment = await newComment.save();
        
        // Broadcast the saved comment to all users in the specific room
        const room = `${comicId}_${chapterId}`;
        io.to(room).emit('receive_comment', savedComment);
      } catch (error) {
        console.error('[Socket] Error saving comment:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`[Socket] User Disconnected: ${socket.id}`);
    });
  });
};

export default handleCommentSocket;
