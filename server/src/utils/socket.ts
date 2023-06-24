import { Socket } from "socket.io";
let users: { id: string; socketId: string; }[] = [];

export const SocketServer = (socket: Socket) => {
  socket.on("joinUser", (id: string) => {
    users.push({ id, socketId: socket.id });
  });
  socket.on("disconnect", (id: string) => {
    users = users.filter(user => user.socketId !== socket.id);
  });

  socket.on("likePost", (post) => {
    console.log(post);
    const clients = users.filter(user => post.user.followers.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("likeToClient", post);
      });
    }

  });
};
