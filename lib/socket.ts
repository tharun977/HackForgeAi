import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & {
      io?: SocketIOServer;
    };
  };
};

export const initSocketServer = (res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      // Handle user joining a project
      socket.on('join-project', (projectId: string, userId: string, userName: string) => {
        socket.join(`project:${projectId}`);
        
        // Broadcast to others in the room that a new user joined
        socket.to(`project:${projectId}`).emit('user-joined', {
          userId,
          userName,
          timestamp: new Date(),
        });
        
        // Send current connected users to the new joiner
        io.to(`project:${projectId}`).emit('users-in-room', {
          projectId,
          users: Array.from(io.sockets.adapter.rooms.get(`project:${projectId}`) || [])
            .map((socketId) => io.sockets.sockets.get(socketId)?.data.user)
            .filter(Boolean),
        });
      });
      
      // Handle user leaving a project
      socket.on('leave-project', (projectId: string, userId: string) => {
        socket.leave(`project:${projectId}`);
        
        // Broadcast to others that a user left
        socket.to(`project:${projectId}`).emit('user-left', {
          userId,
          timestamp: new Date(),
        });
      });
      
      // Handle cursor position updates
      socket.on('cursor-move', (data) => {
        const { projectId, userId, position } = data;
        socket.to(`project:${projectId}`).emit('cursor-update', {
          userId,
          position,
          timestamp: new Date(),
        });
      });
      
      // Handle file content changes
      socket.on('file-change', (data) => {
        const { projectId, fileId, content, userId } = data;
        socket.to(`project:${projectId}`).emit('file-update', {
          fileId,
          content,
          userId,
          timestamp: new Date(),
        });
      });
      
      // Handle chat messages
      socket.on('send-message', (data) => {
        const { projectId, message, userId, userName } = data;
        io.to(`project:${projectId}`).emit('new-message', {
          message,
          userId,
          userName,
          timestamp: new Date(),
        });
      });
      
      // Handle disconnection
      socket.on('disconnect', () => {
        // Notify all rooms this user was in
        const rooms = Object.keys(socket.rooms);
        rooms.forEach((room) => {
          if (room.startsWith('project:')) {
            const projectId = room.replace('project:', '');
            socket.to(room).emit('user-left', {
              userId: socket.data.userId,
              timestamp: new Date(),
            });
          }
        });
      });
    });
  }
  
  return res.socket.server.io;
};