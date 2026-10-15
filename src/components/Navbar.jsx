
import { NavLink } from "react-router-dom";
import {
  House,
  Clock3,
  ChartNoAxesColumn,
} from "lucide-react";

const links = [
  { to: "/", label: "Home", Icon: House, end: true },
  { to: "/timeline", label: "Timeline", Icon: Clock3 },
  { to: "/stats", label: "Stats", Icon: ChartNoAxesColumn },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="shrink-0">
          {/* <span className="text-xl font-bold tracking-tight text-[#214d40]">
            KeenKeeper
          </span> */}
          <span className="text-xl font-bold tracking-tight text-[#214d40]">
            Keen<span className="text-[#4ade80]">Keeper</span>
          </span>
        </NavLink>

        <div className="flex items-center gap-1 sm:gap-3">
          {links.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-md px-2 py-2 text-xs font-medium transition sm:gap-2 sm:px-3 sm:text-sm ${
                  isActive
                    ? "bg-green-500 text-[#ffffff]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`
              }
            >
              <Icon size={15} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
