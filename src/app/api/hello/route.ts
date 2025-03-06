export async function GET() {
    return new Response("ทดสอบ", {
        headers: { "Content-Type": "text/plain" },
        status: 200,
    });
}
    