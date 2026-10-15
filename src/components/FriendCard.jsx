
import { Link } from "react-router-dom";
import { Clock3, Mail, ArrowUpRight } from "lucide-react";

const statusStyles = {
  overdue: "bg-red-100 text-red-700",
  "almost due": "bg-amber-100 text-amber-700",
  "on-track": "bg-emerald-100 text-emerald-700",
};

export default function FriendCard({ friend }) {
  return (
    <Link
      to={`/friends/${friend.id}`}
      className="group block rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-4"
    >
      <div className="flex items-center gap-3">
        <img
          src={friend.picture}
          alt={friend.name}
          loading="lazy"
          className="h-11 w-11 shrink-0 rounded-full border border-gray-100 object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-gray-800">
            {friend.name}
          </h3>

          <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
            <Clock3 size={11} />
            {friend.days_since_contact} days ago
          </p>
        </div>

        <ArrowUpRight
          size={15}
          className="shrink-0 text-gray-400 transition group-hover:text-[#214d40]"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {friend.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-2 py-1 text-[10px] text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
            statusStyles[friend.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {friend.status}
        </span>

        <span className="flex min-w-0 items-center gap-1 text-[10px] text-gray-400">
          <Mail size={11} />
          <span className="truncate">{friend.email}</span>
        </span>
      </div>
    </Link>
  );
}
