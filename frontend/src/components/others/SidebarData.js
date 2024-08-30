import React from "react";
import { FaPerson } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import * as AiIcons from "react-icons/ai";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineInventory2 } from "react-icons/md";
import { GiVintageRobot } from "react-icons/gi";
import { TbLogout2 } from "react-icons/tb";

export const SidebarDataAdmin = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome color="#6c757d" />,
    cName: "nav-text",
  },
  {
    title: "Inventory dashboard",
    path: "/inventory",
    icon: <MdOutlineInventory2 color="#6c757d" />,
    cName: "nav-text",
  },
  {
    title: "Employees",
    path: "/employees",
    icon: <GrUserWorker color="#6c757d" />,
    cName: "nav-text",
  },
  {
    title: "Machines",
    path: "/machines",
    icon: <GiVintageRobot color="#6c757d" />,
    cName: "nav-text",
  },
  {
    title: "Products",
    path: "/products",
    icon: <AiIcons.AiFillProduct color="#6c757d" />,
    cName: "nav-text",
  },
  {
    title: "Permissions",
    path: "/permissions",
    icon: <FaPerson color="#6c757d" />,
    cName: "nav-text",
  },
  {
    title: "Analytics & Reports",
    path: "/analytics",
    icon: <GoGraph color="#6c757d" />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/",
    icon: <TbLogout2 color="#6c757d" />,
    cName: "nav-text-logout nav-text",
  },
];

export const SidebarDataEmployee = [
  {
    title: "Home",
    path: "/employee-home",
    icon: <AiIcons.AiFillHome color="#6c757d" />,
    cName: "nav-text",
  },
  {
    title: "Manage Shifts",
    path: "/employees/calendar",
    icon: <GrUserWorker color="#6c757d" />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/",
    icon: <TbLogout2 color="#6c757d" />,
    cName: "nav-text-logout nav-text",
  },
];
