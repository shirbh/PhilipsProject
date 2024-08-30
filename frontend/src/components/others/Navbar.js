import React, { useContext, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarDataAdmin, SidebarDataEmployee } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import AppContext from "../../context/AppContext";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [, setIsSigned, title, setTitle, user, setUser] =
    useContext(AppContext);
  const [sidebarData, setSideBarData] = useState([]);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    const isAdmin = localStorage.getItem("isAdmin");
    setSideBarData(isAdmin === "true" ? SidebarDataAdmin : SidebarDataEmployee);
  }, [user]);

  const handleMenuClick = (title) => {
    setTitle(title);
    if (title === "Logout") {
      localStorage.clear();
      setIsSigned(false);
    } else if (title === "Manage Shifts") {
    }
  };
  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <div className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} color="#0d6efd" size={60} />
          </div>
          <h1
            className="nav-bar-title"
            style={{ fontSize: "80px", paddingLeft: "80px" }}
          >
            {title}
          </h1>
          <div className="logo-wrapper">
            <Image src={require("../../assets/PHG.png")} className="logo" />
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <AiIcons.AiOutlineClose className="menu-bars-close" />
            </li>
            {sidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link
                    to={item.path}
                    state={user}
                    onClick={() => handleMenuClick(item.title)}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
