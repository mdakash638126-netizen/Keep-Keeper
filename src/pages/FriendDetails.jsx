
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BellRing,
  Archive,
  Trash2,
  PhoneCall,
  MessageSquare,
  Video,
  Pencil,
  ArrowLeft,
} from "lucide-react";

export default function FriendDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [goal, setGoal] = useState(30);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let active = true;

    fetch("/friends.json")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load friends");
        return res.json();
      })
      .then((friends) => {
        const selectedFriend = friends.find(
          (item) => String(item.id) === String(id)
        );

        if (!active) return;

        setFriend(selectedFriend || null);
        setGoal(Number(selectedFriend?.goal) || 30);
      })
      .catch(() => {
        if (active) setError("বন্ধুর তথ্য লোড করা যায়নি।");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const showMessage = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  };

  const handleCheckIn = (type) => {
    if (!friend) return;

    const newEntry = {
      id: String(Date.now()),
      type,
      friendId: friend.id,
      friendName: friend.name,
      date: new Date().toISOString(),
    };

    try {
      const savedEntries = JSON.parse(
        localStorage.getItem("keenkeeper-timeline") || "[]"
      );

      const entries = Array.isArray(savedEntries) ? savedEntries : [];

      localStorage.setItem(
        "keenkeeper-timeline",
        JSON.stringify([newEntry, ...entries])
      );

      navigate("/timeline");
    } catch {
      showMessage("Timeline-এ তথ্য সেভ করা যায়নি।");
    }
  };

  const handleSnooze = () => {
    const until = new Date();
    until.setDate(until.getDate() + 14);

    showMessage(
      `Snoozed until ${until.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`
    );
  };

  const handleArchive = () => {
    const archived = JSON.parse(
      localStorage.getItem("keenkeeper-archived") || "[]"
    );

    if (!archived.some((item) => String(item.id) === String(friend.id))) {
      localStorage.setItem(
        "keenkeeper-archived",
        JSON.stringify([...archived, friend])
      );
    }

    showMessage(`${friend.name} archived`);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${friend.name}?`
    );

    if (!confirmed) return;

    const deletedIds = JSON.parse(
      localStorage.getItem("keenkeeper-deleted") || "[]"
    );

    localStorage.setItem(
      "keenkeeper-deleted",
      JSON.stringify([...new Set([...deletedIds, String(friend.id)])])
    );

    navigate("/");
  };

  const saveGoal = () => {
    const allGoals = JSON.parse(
      localStorage.getItem("keenkeeper-goals") || "{}"
    );

    allGoals[String(friend.id)] = Number(goal);

    localStorage.setItem("keenkeeper-goals", JSON.stringify(allGoals));
    setShowEdit(false);
    showMessage("Relationship goal updated");
  };

  if (loading) {
    return (
      <main className="grid min-h-64 place-items-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </main>
    );
  }

  if (error || !friend) {
    return (
      <main className="min-h-64 bg-slate-50 px-4 py-12 text-center">
        <p className="text-slate-600">{error || "Friend not found."}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded-lg bg-emerald-700 px-4 py-2 text-sm text-white"
        >
          Back to Home
        </button>
      </main>
    );
  }

  const savedGoals = JSON.parse(
    localStorage.getItem("keenkeeper-goals") || "{}"
  );

  const currentGoal = Number(savedGoals[String(friend.id)] ?? goal) || 30;

  const nextDue = friend.next_due_date
    ? new Date(friend.next_due_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Not set";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      {toast && (
        <div
          role="status"
          className="fixed right-4 top-4 z-50 rounded-lg bg-emerald-700 px-4 py-3 text-sm text-white shadow-lg"
        >
          {toast}
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="grid grid-cols-1 gap-3 border border-slate-200 bg-white p-3 md:grid-cols-[180px_minmax(0,1fr)]">
          {/* Friend profile */}
          <aside className="border-b border-slate-200 pb-4 text-center md:border-b-0 md:border-r md:pr-3">
            <img
              src={friend.picture}
              alt={friend.name}
              className="mx-auto h-11 w-11 rounded-full object-cover"
            />

            <h2 className="mt-2 text-xs font-bold text-slate-800">
              {friend.name}
            </h2>

            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] ${
                friend.status === "overdue"
                  ? "bg-red-100 text-red-700"
                  : friend.status === "almost due"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
              }`}
            >
              {friend.status || "on-track"}
            </span>

            <div className="mt-1 flex flex-wrap justify-center gap-1">
              {(friend.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-green-100 px-2 py-0.5 text-[9px] text-green-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-2 text-[10px] italic text-slate-500">
              "{friend.bio || "A valued friend."}"
            </p>

            <p className="mt-1 text-[10px] text-slate-500">
              Preferred: {friend.preferred_contact || "email"}
            </p>

            <div className="mt-4 space-y-1">
              <button
                onClick={handleSnooze}
                className="flex w-full items-center justify-center gap-1 border border-slate-200 py-2 text-[10px] hover:bg-slate-100"
              >
                <BellRing size={11} />
                Snooze 2 Weeks
              </button>

              <button
                onClick={handleArchive}
                className="flex w-full items-center justify-center gap-1 border border-slate-200 py-2 text-[10px] hover:bg-slate-100"
              >
                <Archive size={11} />
                Archive
              </button>

              <button
                onClick={handleDelete}
                className="flex w-full items-center justify-center gap-1 border border-slate-200 py-2 text-[10px] text-red-500 hover:bg-red-50"
              >
                <Trash2 size={11} />
                Delete
              </button>
            </div>
          </aside>

          {/* Right side */}
          <section className="min-w-0">
            {/* Stats cards */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <StatCard
                value={friend.days_since_contact ?? 0}
                label="Days Since Contact"
              />

              <StatCard value={currentGoal} label="Goal (Days)" />

              <StatCard value={nextDue} label="Next Due" />
            </div>

            {/* Relationship goal */}
            <div className="mt-3 rounded border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-emerald-950">
                  Relationship Goal
                </h3>

                <button
                  onClick={() => setShowEdit(!showEdit)}
                  className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-[9px] hover:bg-slate-100"
                >
                  <Pencil size={10} />
                  Edit
                </button>
              </div>

              {showEdit ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <label htmlFor="goal" className="text-xs text-slate-600">
                    Connect every
                  </label>

                  <input
                    id="goal"
                    type="number"
                    min="1"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-20 rounded border border-slate-300 px-2 py-1 text-sm"
                  />

                  <span className="text-xs text-slate-600">days</span>

                  <button
                    onClick={saveGoal}
                    className="rounded bg-emerald-700 px-3 py-1.5 text-xs text-white hover:bg-emerald-800"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="mt-3 text-[10px] text-slate-500">
                  Connect every{" "}
                  <strong className="text-slate-800">
                    {currentGoal} days
                  </strong>
                </p>
              )}
            </div>

            {/* Quick check-in */}
            <div className="mt-3 rounded border border-slate-200 bg-white p-3">
              <h3 className="mb-3 text-xs font-semibold text-emerald-950">
                Quick Check-In
              </h3>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <CheckInButton
                  icon={<PhoneCall size={16} />}
                  label="Call"
                  onClick={() => handleCheckIn("Call")}
                />

                <CheckInButton
                  icon={<MessageSquare size={16} />}
                  label="Text"
                  onClick={() => handleCheckIn("Text")}
                />

                <CheckInButton
                  icon={<Video size={16} />}
                  label="Video"
                  onClick={() => handleCheckIn("Video")}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="flex min-h-20 flex-col items-center justify-center rounded border border-slate-200 bg-white p-3 text-center">
      <p className="text-base font-bold text-emerald-900">{value}</p>
      <p className="mt-1 text-[10px] text-slate-500">{label}</p>
    </div>
  );
}

function CheckInButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex min-h-12 flex-col items-center justify-center gap-1 rounded border border-slate-200 bg-slate-50 py-2 text-[10px] text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50"
    >
      {icon}
      {label}
    </button>
  );
}
