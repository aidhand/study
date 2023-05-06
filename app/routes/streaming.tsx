import { type LoaderArgs, defer, json } from "@vercel/remix";
import { Await, useLoaderData } from "@remix-run/react";
import { parseVercelId } from "~/lib/parse-vercel";
import { Suspense } from "react";

export const config = { runtime: "edge" };

function sleep(val: any, ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(val), ms));
}

export async function loader({ request }: LoaderArgs) {
  const parsedId = parseVercelId(request.headers.get("x-vercel-id"));
  return defer({
    error: false,
    message: "Hello from the edge!",

    edgeRegion: sleep(parsedId.proxyRegion, 250),
    computeRegion: sleep(parsedId.computeRegion, 500),
  });
}

export function headers({ request }: LoaderArgs) {}

export default function App() {
  const { error, message, edgeRegion, computeRegion } =
    useLoaderData<typeof loader>();
  return (
    <main>
      <Suspense fallback={"loading..."}>
        <Await resolve={message}>{(message) => <h1>{message}</h1>}</Await>
        <br />
        <p>
          Edge Region:{" "}
          <Suspense fallback={"loading..."}>
            <Await resolve={edgeRegion}>{(region) => region}</Await>
          </Suspense>
        </p>
        <p>
          Compute Region:{" "}
          <Suspense fallback={"loading..."}>
            <Await resolve={computeRegion}>{(region) => region}</Await>
          </Suspense>
        </p>
        <Await resolve={error}>
          {error && <h1>Error</h1>}
          {error && <p>{message}</p>}
        </Await>
      </Suspense>
    </main>
  );
}
