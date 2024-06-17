import env from "dotenv";

export async function GET() {
    const data = await fetch(`https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API}&q=金髪`).then(res => res.json());
    return Response.json(data);
}