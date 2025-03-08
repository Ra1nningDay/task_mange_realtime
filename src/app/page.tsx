import axios from "axios";

export default async function Home() {
    const res = await axios("http://localhost:3000/api/tasks");

    return <h1>{text}</h1>;
}
