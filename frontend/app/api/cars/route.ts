export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();

  const res = await fetch(`${process.env.CARS_API_BASE_URL}/cars?${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return new Response("Failed to fetch cars", { status: 500 });
  }

  const data = await res.json();
  return Response.json(data);
}
