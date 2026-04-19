import { NavLink } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuLayers,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";
import { MdOutlineInventory2 } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/dashboard", icon: <LuLayoutDashboard /> },
  { name: "Products", path: "/products", icon: <MdOutlineInventory2 /> },
  { name: "Orders", path: "/orders", icon: <LuLayers /> },
  { name: "Customers", path: "/customers", icon: <TbUsersGroup /> },
  { name: "Settings", path: "/settings", icon: <LuSettings /> },
  { name: "Log out", path: "/logout", icon: <LuLogOut /> },
];

export default function Sidebar() {
  const baseStyles =
    "flex items-center gap-3 text-lg transition px-4 py-2 rounded-full";
  const hoverStyles = "hover:bg-nord-frost hover:text-nord-white";
  const activeStyles = "bg-nord-frost text-nord-white";

  return (
    <div className="h-screen px-4 py-2 flex flex-col gap-6 w-60 border-r-2 border-gray-100">
      <h1 className="font-bold text-xl px-4">KS GROUP</h1>
      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `${baseStyles} ${isActive ? activeStyles : hoverStyles}`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
