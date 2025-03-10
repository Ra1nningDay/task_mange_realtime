import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3001"; // ✅ URL ของ Backend

const socket: Socket = io(SOCKET_URL, {
    withCredentials: true,
    autoConnect: false, // ไม่ให้เชื่อมต่ออัตโนมัติ
});

export default socket;
