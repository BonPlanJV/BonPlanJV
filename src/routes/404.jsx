import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="h-screen w-full space-x-2 flex justify-center items-center text-center mx-auto text-white">
      <h1>
        404 Not Found.
      </h1>
      <Link to="/" className="text-sky-600 hover:underline">
        Go home
      </Link>
    </main>
  );
}
