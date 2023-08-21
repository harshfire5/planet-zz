import React, {useEffect, useState} from 'react';
import {NavLink, Outlet} from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

const RootLayout = () => {
  const [navScroll, setNavScroll] = useState("");

  const changeNavbar = () => {
    // console.log(window.scrollY)
    window.scrollY > 0 ? setNavScroll("nav-sticky") : setNavScroll("")
  }

  useEffect(() => {
    changeNavbar();
    window.addEventListener("scroll", changeNavbar);
    // return () => window.removeEventListener("scroll", changeNavbar);
  }, []);

  return (
    <div className="RootLayout">
      <video className="videoBackground" src={require("./vid/space.mp4")} autoPlay loop muted />
      <header className={navScroll}>
        <nav>
          <h1><NavLink to="/">Planet Zz</NavLink></h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="activities">Activities</NavLink>
          <NavLink to="apply">Apply</NavLink>
        </nav>
      </header>
      <div className="rootContent">
        <Breadcrumbs />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;