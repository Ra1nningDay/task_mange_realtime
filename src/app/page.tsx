import axios from "axios";
import { Task } from "../types/task";
    
export default async function Home() {
    const res = await axios.get("http://localhost:3000/api/tasks", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    const tasks = res.data;

    return (
        <div>
            <h1>Tasks</h1>
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
