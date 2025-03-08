"use client";

import axios from "axios";
import { Task } from "../types/task";
import { useState, useEffect } from "react";

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");

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
            setTasks([...tasks, res.data]);
            setNewTask("");
        } catch (err) {
            console.error("Error Adding Task", err);
        }
    }

    return (
        <div>
            <h1>Tasks</h1>
            <input
                type="text"
                onChange={(e) => setNewTask(e.target.value)}
                value={newTask}
            />
            <button onClick={handleAdd}>Add Task</button>
            <ul>
                {tasks.map((task: Task) => (
                    <li key={task.id}>
                        {task.name} - {task.completed ? "Done" : "Pending"}
                    </li>
                ))}
            </ul>
        </div>
    );
}
