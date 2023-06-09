import { type LoaderArgs, json } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";
import { parseVercelId } from "~/lib/parse-vercel";

export const config = { runtime: "edge" };
export async function loader({ request }: LoaderArgs) {
  const parsedId = parseVercelId(request.headers.get("x-vercel-id"));
  return json({
    success: true,
    error: false,
    message: "Hello from the edge!",
    data: {
      edgeRegion: parsedId.proxyRegion,
      computeRegion: parsedId.computeRegion,
    },
  });
}

export function headers({ request }: LoaderArgs) {}

export default function App() {
  const { success, error, message, data } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>{message}</h1>
      <p>Success: {success.toString()}</p>
      <p>Error: {error.toString()}</p>
      <p>Edge Region: {data.edgeRegion}</p>
      <p>Compute Region: {data.computeRegion}</p>
    </main>
  );
}
