export default async function Home() {
    const res = await fetch("http://localhost:3000/api/hello");
    const text = await res.text();
    // const text = "hello";

    return <h1>{text}</h1>;
}
