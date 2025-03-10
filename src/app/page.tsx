"use client";

// import socket from "../utils/socket";
import axios from "axios";
import { Task } from "../types/task";
import { useState, useEffect } from "react";

export default function Home() {
    // useEffect(() => {
    //     socket.connect();

    //     socket.on("connect", () => {
    //         console.log("Connected to WebSocket ✅");
    //     });

    //     socket.on("disconnect", () => {
    //         console.log("Disconnected from WebSocket ❌");
    //     });

    //     return () => {
    //         socket.disconnect();
    //     };
    // }, []);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>("");
    // const [isCompeted, setCompeted] = useState<boolean>(false);

    useEffect(() => {
        const fetchTask = async () => {
            const res = await axios.get("http://localhost:3001/api/tasks", {
                headers: { "Content-Type": "application/json" },
            });
            setTasks(res.data);
        };
        fetchTask();
    }, []);

    async function handleAdd() {
        if (!newTask.trim()) return;

        try {
            const res = await axios.post("http://localhost:3001/api/tasks", {
                name: newTask,
                completed: false,
            });
            setTasks((prevTasks) => [...prevTasks, res.data]);
            setNewTask("");
        } catch (err) {
            console.error("Error Adding Task", err);
        }
    }

    async function handleUpdate(id: number) {
        try {
            await axios.put(`http://localhost:3001/api/tasks/${id}`, {
                completed: true,
            });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? { ...task, completed: true } : task
                )
            );
        } catch (err) {
            console.error("Error Updatnig Task", err);
        }
    }

    async function handleDel(id: number) {
        try {
            await axios.delete(`http://localhost:3001/api/tasks/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (err) {
            console.error("Error to delete task", err);
        }
    }

    // useEffect(() => {
    //     const handleChange = () => {
    //         (prevTasks) => [tasks.name.value];
    //     };
    // });

    return (
        <div className="max-w-2xl mx-auto border-2 p-4 my-8">
            <h1 className="text-center text-4xl font-bold mb-6">
                Task Managaement
            </h1>
            <div className="flex text-center">
                <input
                    type="text"
                    className="bg-white text-black text-2xl me-2 w-full"
                    onChange={(e) => setNewTask(e.target.value)}
                    value={newTask}
                />
                <button
                    type="button"
                    className="dark:bg-white cursor-pointer w-30 py-2 px-1 dark:hover:bg-black dark:hover:text-white border-2 dark:text-black"
                    onClick={handleAdd}
                >
                    Add Task
                </button>
            </div>
            {tasks.map((task: Task) => (
                <div
                    key={task.id}
                    className="flex flex-column justify-between p-4 border-2 mt-3"
                >
                    <p>{task.name}</p>
                    <div className="flex">
                        {task.completed ? (
                            <span className="me-2">Completed</span>
                        ) : (
                            <button
                                onClick={() => handleUpdate(task.id)}
                                className="me-2 cursor-pointer"
                            >
                                Complete
                            </button>
                        )}
                        <button
                            className="cursor-pointer"
                            onClick={() => handleDel(task.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
