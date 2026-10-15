
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex min-h-80 flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-extrabold text-[#214d40]">
        404
      </h1>

      <p className="mt-3 text-gray-600">
        Sorry, this page could not be found.
      </p>

      <Link
        to="/"
        className="mt-5 rounded-md bg-[#214d40] px-4 py-2 text-sm font-semibold text-white"
      >
        Back to Home
      </Link>
    </section>
  );
}
