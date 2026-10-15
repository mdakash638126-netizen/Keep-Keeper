
import {
  Users,
  CheckCircle2,
  Clock3,
  CalendarDays,
} from "lucide-react";

export default function SummaryCards({ friends }) {
  const total = friends.length;
  const onTrack = friends.filter(
    (friend) => friend.status === "on-track"
  ).length;
  const overdue = friends.filter(
    (friend) => friend.status === "overdue"
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueSoon = friends.filter((friend) => {
    const dueDate = new Date(
      `${friend.next_due_date}T00:00:00`
    );
    const difference = Math.ceil(
      (dueDate - today) / (1000 * 60 * 60 * 24)
    );

    return difference >= 0 && difference <= 3;
  }).length;

  const cards = [
    {
      label: "Total Friends",
      value: total,
      Icon: Users,
      color: "text-[#315b4b]",
    },
    {
      label: "On Track",
      value: onTrack,
      Icon: CheckCircle2,
      color: "text-emerald-600",
    },
    {
      label: "Overdue",
      value: overdue,
      Icon: Clock3,
      color: "text-red-500",
    },
    {
      label: "Due Soon",
      value: dueSoon,
      Icon: CalendarDays,
      color: "text-amber-600",
    },
  ];

  return (
    <section className="mx-auto grid max-w-3xl grid-cols-2 gap-3 px-4 sm:grid-cols-4">
      {cards.map(({ label, value, Icon, color }) => (
        <article
          key={label}
          className="rounded-lg border border-gray-100 bg-white px-3 py-4 text-center shadow-sm"
        >
          <Icon
            size={17}
            className={`mx-auto mb-2 ${color}`}
          />
          <p className="text-xl font-bold text-gray-800">
            {value}
          </p>
          <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
            {label}
          </p>
        </article>
      ))}
    </section>
  );
}
