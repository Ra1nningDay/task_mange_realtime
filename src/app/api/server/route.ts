export async function GET() {
    return new Response("ทดสอบ API", {
        headers: { "Content-Type": "text/plain" },
        status: 200,
    });
}
