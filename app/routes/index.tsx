import { Link } from "@remix-run/react";

export default function App() {
  return (
    <div>
      <h1>Index</h1>
      <Link to="/edge">Edge</Link>
      <br />
      <Link to="/streaming">Streaming</Link>
    </div>
  );
}
