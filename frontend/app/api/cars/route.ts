export async function GET(req: Request) {
  const baseUrl = process.env.CARS_API_BASE_URL;
  if (!baseUrl) {
    return new Response("Missing CARS_API_BASE_URL", { status: 500 });
  }

  const allowedOrigin = process.env.APP_ORIGIN;
  if (allowedOrigin) {
    const origin = req.headers.get("origin") || "";
    const referer = req.headers.get("referer") || "";
    const isAllowed =
      origin.startsWith(allowedOrigin) || referer.startsWith(allowedOrigin);

    if (!isAllowed) {
      return new Response("Forbidden", { status: 403 });
    }
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();

  const headers: HeadersInit = {};
  if (process.env.CARS_API_KEY) {
    headers["x-api-key"] = process.env.CARS_API_KEY;
  }

  const res = await fetch(`${baseUrl}/cars?${query}`, {
    cache: "no-store",
    headers,
  });

  if (!res.ok) {
    return new Response("Failed to fetch cars", { status: 500 });
  }

  const data = await res.json();
  return Response.json(data);
}
