
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { House } from "lucide-react";

const COLORS = ["#8138F5", "#204F42", "#31A46C"];

export default function Stats() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("keenkeeper-timeline") || "[]"
      );
      setActivities(Array.isArray(saved) ? saved : []);
    } catch {
      setActivities([]);
    }
  }, []);

  const data = [
    {
      name: "Text",
      value: activities.filter((item) => item.type === "Text").length,
    },
    {
      name: "Call",
      value: activities.filter((item) => item.type === "Call").length,
    },
    {
      name: "Video",
      value: activities.filter((item) => item.type === "Video").length,
    },
  ];

  const hasData = data.some((item) => item.value > 0);

  return (
    <main className="min-h-[calc(100vh-100px)] bg-slate-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-2 flex justify-end">
          <Link
            to="/"
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-700"
          >
            <House size={13} />
            Home
          </Link>
        </div>

        <h1 className="  pb-1 text-2xl font-bold text-slate-800">
          Friendship Analytics
        </h1>

        <section className=" rounded-2xl bg-white px-4 py-4">
          <h2 className="text-xs font-medium text-emerald-950">
            By Interaction Type
          </h2>

          <div className="h-[280px] w-full">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="46%"
                    innerRadius={42}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    iconSize={6}
                    wrapperStyle={{ fontSize: "10px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
                <div className="h-24 w-24 rounded-full border-[12px] border-slate-200" />
                <p className="mt-3 text-xs text-slate-500">
                  No interactions yet. Try a Call, Text, or Video check-in.
                </p>
                <Link
                  to="/"
                  className="mt-3 rounded bg-emerald-800 px-3 py-2 text-xs text-white hover:bg-emerald-900"
                >
                  View Friends
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
