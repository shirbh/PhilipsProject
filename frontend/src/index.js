import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Login from "./components/others/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ForgotPassword from "./components/others/ForgotPassword";
import Navbar from "./components/others/Navbar";
import Employees from "./components/employees/Employees";
import "./App.css";
import AppContext from "./context/AppContext";
import EmployeeCalendar from "./components/employees/EmployeeCalendar";
import MachineCalendar from "./components/machines/MachineCalendar";
import Products from "./components/products/Products";
import Machines from "./components/machines/Machines";
import AdminHome from "./components/adminScreens/AdminHome";
import Permissions from "./components/employees/Permissions";
import Inventory from "./components/products/Inventory";
import AdminMachinesCalendar from "./components/adminScreens/AdminMachinesCalendar";
import Home from "./components/employeeScreens/Home";
import Analytics from "./components/others/Analytics";

const AppLayout = () => {
  const [isSigned, setIsSigned] = useState(false);
  const [title, setTitle] = useState("Welcome");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const titleFromUrl = window.location.href.split("/").pop();
    if (titleFromUrl[0]) {
      setTitle(titleFromUrl[0].toUpperCase() + titleFromUrl.slice(1));
    }
    if (localStorage.getItem("signedIn")) {
      setIsSigned(true);
    }
  }, []);
  return (
    <AppContext.Provider
      value={[isSigned, setIsSigned, title, setTitle, user, setUser]}
    >
      {isSigned && <Navbar />}
      <Outlet />
    </AppContext.Provider>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "home",
        element: <AdminHome />,
      },
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "machines",
        element: <Machines />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/employees/calendar",
        element: <EmployeeCalendar />,
      },
      {
        path: "/machines/calendar",
        element: <MachineCalendar />,
      },
      {
        path: "/permissions",
        element: <Permissions />,
      },
      {
        path: "home/machines-calendar",
        element: <AdminMachinesCalendar />,
      },
      {
        path: "/employee-home",
        element: <Home />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
