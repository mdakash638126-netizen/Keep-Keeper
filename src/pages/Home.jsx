
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import Banner from "../components/Banner";
import SummaryCards from "../components/SummaryCards";
import FriendCard from "../components/FriendCard";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadFriends() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/friends.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load friends data.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Friends data must be a JSON array.");
        }

        setFriends(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadFriends();

    return () => controller.abort();
  }, []);

  return (
    <>
      <Banner />

      {loading ? (
        <section className="flex min-h-52 flex-col items-center justify-center gap-3 px-4">
          <div
            className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-[#214d40]"
            role="status"
            aria-label="Loading friends"
          />
          <p className="text-sm text-gray-500">
            Loading your friends...
          </p>
        </section>
      ) : error ? (
        <section className="mx-auto max-w-3xl px-4 py-12 text-center">
          <p className="text-sm text-red-600">{error}</p>
          <p className="mt-2 text-xs text-gray-500">
            Check that public/friends.json exists and contains valid JSON.
          </p>
        </section>
      ) : (
        <>
          <SummaryCards friends={friends} />

          <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Your Friends
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Keep your important connections close.
                </p>
              </div>

              <span className="flex items-center gap-1 rounded-full bg-[#e4eee9] px-2.5 py-1 text-xs font-semibold text-[#214d40]">
                <Users size={13} />
                {friends.length}
              </span>
            </div>

            {friends.length === 0 ? (
              <p className="rounded-lg bg-white p-8 text-center text-sm text-gray-500">
                No friends found.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {friends.map((friend) => (
                  <FriendCard
                    key={friend.id}
                    friend={friend}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
