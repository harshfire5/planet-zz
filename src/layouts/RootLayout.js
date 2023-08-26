import {NavLink, useLocation, useOutlet, useParams} from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import {AnimatePresence, motion} from "framer-motion";
import useTypes from "../hooks/useTypes";
import {useState} from "react";

const navVariant = {
  "hidden": {
    opacity: 0
  },
  "visible": {
    opacity: 1,
    transition: {
      duration: 0.2
    }
  }
}

const lineVariants = {
  hidden: {
    pathLength: 0
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut'
    }
  }
}

const lineVariantsMiddle = {
  hidden: {
    pathLength: 0,
    opacity: 1
  },
  visible: {
    opacity: 0,
    pathLength: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
    }
  }
}

const textVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.4
    }
  }
}

const contentVariant = {
  hidden: {
    y: -window.screen.availHeight,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  },
  exit: {
    y: window.screen.availHeight,
    opacity: 0,
    transition: {
      duration: 0.7
    }
  }
}

const RootLayout = () => {
  const location = useLocation();
  const { type } = useParams();
  const { isRightType } = useTypes(type);
  const outlet = useOutlet();
  const [isFirstRender, setIsFirstRender] = useState(true);
  console.log(window.screen.availHeight);
  return (
    <div className="RootLayout">
      <header>
        <motion.nav
          variants={navVariant}
          initial="hidden"
          animate="visible"
        >
          <div>
            <NavLink to="/">
              <svg height="47" width="130">
                <motion.line x1="0" y1="0" x2="124" y2="0" strokeWidth="5.5"
                             variants={lineVariants}
                />
                <motion.line x1="0" y1="46" x2="62" y2="23" strokeWidth="3"
                             variants={lineVariantsMiddle}
                />
                <motion.line x1="124" y1="0" x2="62" y2="23" strokeWidth="3"
                             variants={lineVariantsMiddle}
                />
                <motion.line x1="124" y1="46" x2="0" y2="46" strokeWidth="3"
                             variants={lineVariants}
                />
                <motion.text x="10" y="32"
                      variants={textVariant}
                >
                  Planet Zz
                </motion.text>
              </svg>
            </NavLink>
          </div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="activities">Activities</NavLink>
          <NavLink to="apply">Apply</NavLink>
        </motion.nav>
      </header>
      <AnimatePresence mode="wait" onExitComplete={() => setIsFirstRender(false)}>
        <motion.div
          className="rootContent"
          variants={contentVariant}
          location={location}
          key={location.pathname}
          initial={ !isRightType() ? "hidden" : "" }
          animate={ !isRightType() ? "visible": "" }
          transition={ isFirstRender ? {delay: 1.4, duration: 0.7} : {duration: 0.7} }
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