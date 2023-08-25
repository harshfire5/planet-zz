import React, {useEffect, useState} from 'react';
import {NavLink, useLocation, useOutlet, useParams} from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import {AnimatePresence, motion} from "framer-motion";
import useTypes from "../useTypes";

const headingVariant = {
  "hidden": {
    x: '-80vw'
  },
  "visible": {
    x: 0
  }
}

const contentVariant = {
  hidden: {
    y: -window.innerHeight
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.6,
      // repeat: 2,
      // repeatType: 'reverse'
    }
  },
  exit: {
    y: window.innerHeight,
    transition: {
      duration: 0.6
    }
  }
}

const RootLayout = () => {
  const [navScroll, setNavScroll] = useState("");
  const location = useLocation();
  const { type } = useParams();
  const { isRightType } = useTypes(type);
  const outlet = useOutlet();


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
      {/*<video className="videoBackground" src={require("../vid/space.mp4")} autoPlay loop muted />*/}
      <header className={navScroll}>
        <nav>
          <motion.h1
            variants={headingVariant}
            initial="hidden"
            animate="visible"
          >
            <NavLink to="/">Planet Zz</NavLink>
          </motion.h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="activities">Activities</NavLink>
          <NavLink to="apply">Apply</NavLink>
        </nav>
      </header>
      <AnimatePresence mode="wait">
        <motion.div
          className="rootContent"
          variants={contentVariant}
          location={location}
          key={location.pathname}
          initial={ !isRightType() ? "hidden" : "" }
          animate={ !isRightType() ? "visible": "" }
          exit="exit"
        >
          <Breadcrumbs location={location} />
          <main>
            {outlet}
          </main>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RootLayout;