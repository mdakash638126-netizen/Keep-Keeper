
import { useEffect, useState } from "react";
import { PhoneCall, MessageSquare, Video, Handshake } from "lucide-react";

const icons = {
  Call: <PhoneCall size={17} />,
  Text: <MessageSquare size={17} />,
  Video: <Video size={17} />,
  Meetup: <Handshake size={17} />,
};

export default function Timeline() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadEntries = () => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("keenkeeper-timeline") || "[]"
        );
        setEntries(Array.isArray(saved) ? saved : []);
      } catch {
        setEntries([]);
      }
    };

    loadEntries();
    window.addEventListener("storage", loadEntries);

    return () => window.removeEventListener("storage", loadEntries);
  }, []);

  const filteredEntries =
    filter === "All"
      ? entries
      : entries.filter((entry) => entry.type === filter);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-3 text-2xl font-bold text-slate-800">
          Timeline
        </h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-3 w-36 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none focus:border-emerald-500"
          aria-label="Filter timeline"
        >
          <option value="All">Filter timeline</option>
          <option value="Call">Call</option>
          <option value="Text">Text</option>
        
          
        
        </select>

        <div className="space-y-2">
          {filteredEntries.map((entry) => (
            <article
              key={entry.id}
              className="flex min-h-12 items-center gap-3 rounded border border-slate-200 bg-white px-3 py-2"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center text-slate-700">
                {icons[entry.type] || <Handshake size={17} />}
              </span>

              <div className="min-w-0">         
                <p className="text-xs text-slate-700">
                  <span className="font-semibold text-emerald-900">
                    {entry.type}
                  </span>{" "}
                  <span className="text-slate-500">
                    with {entry.friendName}
                  </span>
                </p>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </article>
          ))}

          {filteredEntries.length === 0 && (
            <div className="rounded border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
              No timeline activities yet. Make a Call, Text, or Video
              check-in from a friend's details page.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
