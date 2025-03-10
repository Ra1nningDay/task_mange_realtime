"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
    transports: ["websocket"], // ใช้ WebSocket เท่านั้น (ลดดีเลย์)
    withCredentials: true, // ถ้ามี Auth
});

export default function Test() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to WebSocket server");
        });

        socket.on("message", (data) => {
            console.log("Message received:", data);
            setMessage(data);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from WebSocket server");
        });

        return () => {
            socket.off("connect");
            socket.off("message");
            socket.off("disconnect");
        };
    }, []);

    return (
        <div>
            <h1>WebSocket Test</h1>
            <p>Message: {message}</p>
        </div>
    );
}
