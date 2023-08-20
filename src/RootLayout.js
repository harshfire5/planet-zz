import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="RootLayout">
      <header>
        <nav>
          <h1><NavLink to="/">Planet Zz</NavLink></h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="activities">Activities</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;