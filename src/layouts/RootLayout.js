import {NavLink, useLocation, useOutlet, useParams} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
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
      opacity: {
        duration: 0.5,
      },
      pathLength: {
        duration: 0.4
      }
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

const RootLayout = ({ types }) => {
  const location = useLocation();
  const { type } = useParams();
  const outlet = useOutlet();
  const [isFirstRender, setIsFirstRender] = useState(true);
  console.log(window.screen.availHeight);
  return (
    <div id="myRoot" className="RootLayout">
      <header id="header">
        <motion.nav
          variants={navVariant}
          initial="hidden"
          animate="visible"
          drag
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          dragElastic={0.8}
        >
          <div>
            <NavLink to="/">
              <svg height="48" width="116">
                <motion.line x1="0" y1="10" x2="116" y2="10"
                             variants={lineVariants}
                />
                <motion.line x1="0" y1="44" x2="58" y2="27"
                             variants={lineVariantsMiddle}
                />
                <motion.line x1="116" y1="10" x2="58" y2="27"
                             variants={lineVariantsMiddle}
                />
                <motion.line x1="116" y1="44" x2="0" y2="44"
                             variants={lineVariants}
                />
                <motion.text x="6" y="34"
                      variants={textVariant}
                >
                  Planet Zz
                </motion.text>
              </svg>
            </NavLink>
          </div>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="about">ABOUT</NavLink>
          <NavLink to="activities">ACTIVITIES</NavLink>
          <NavLink to="apply">APPLY</NavLink>
        </motion.nav>
      </header>
      <AnimatePresence mode="wait" onExitComplete={() => setIsFirstRender(false)}>
        <motion.div
          className="rootContent"
          variants={contentVariant}
          location={location}
          key={location.pathname}
          initial={ location.pathname !== '/activities' && !types[type] ? "hidden" : "" }
          animate={ location.pathname !== '/activities' && !types[type] ? "visible": "" }
          transition={ isFirstRender && location.pathname !== '/activities' ? {delay: 1.4, duration: 0.7} : {duration: 0.7} }
          exit={ location.pathname !== '/activities' && !types[type] ? "exit": "" }
        >
          {/*<Breadcrumbs location={location} />*/}
          <main>
            {outlet}
          </main>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RootLayout;