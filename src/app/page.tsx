"use client";

import axios from "axios";
import { Task } from "../types/task";
import { useState, useEffect } from "react";

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");
    const [isEdit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        const fetchTask = async () => {
            const res = await axios.get("http://localhost:3000/api/tasks", {
                headers: { "Content-Type": "application/json" },
            });
            setTasks(res.data);
        };
        fetchTask();
    }, []);

    async function handleAdd() {
        if (!newTask.trim()) return;

        try {
            const res = await axios.post("http://localhost:3000/api/tasks", {
                name: newTask,
                completed: false,
            });
            setTasks((prevTasks) => [...prevTasks, res.data]);
            setNewTask("");
        } catch (err) {
            console.error("Error Adding Task", err);
        }
    }

    async function handleDel(id) {
        try {
            const res = await axios.delete(
                `http://localhost:3000/api/tasks/${id}`
            );
            setTasks((prevTasks) => [...prevTasks, res.data]);
        } catch (err) {
            console.error("Error to delete task", err);
        }
    }

    return (
        <div className="max-w-2xl mx-auto border-2 p-4 my-8">
            <h1 className="text-center text-4xl font-bold mb-6">
                Task Managaement
            </h1>
            <div className="flex">
                <input
                    type="text"
                    className="bg-white text-black text-2xl me-2 w-full"
                    onChange={(e) => setNewTask(e.target.value)}
                    value={newTask}
                />
                <button
                    type="button"
                    className="dark:bg-white cursor-pointer dark:hover:bg-black dark:hover:text-white border-2 dark:text-black"
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
                        <button className="me-2 cursor-pointer">
                            Complete
                        </button>
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
