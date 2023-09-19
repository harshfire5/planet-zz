import ApplyForm from "./ApplyForm";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useRef, useState} from "react";

const spaceshipVariant = {
  hidden: {
    x: 150,
    opacity: 0
  },
  visible: {
    x: 0,
    y: [0, -20, 20, 0],
    opacity: 1,
    transition:{
      delay: 1,
      duration: 5,
      opacity: {
        duration: 1
      }
    }
  },
  exit: {
    opacity: 0
  }
}

const Apply = () => {
  const spaceship = useRef(null);
  const yoda = useRef(null);
  const [spaceshipImg, setSpaceshipImg] = useState(false);
  const [spaceshipGif, setSpaceshipGif] = useState(false);
  const [mouseGif, setMouseGif] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);

  const changeSpaceship = () => {
    console.log(spaceship);
    setSpaceshipGif(true);
    // yoda.current.style.display = "block";
    setTimeout(() => {
      setSpaceshipGif(false);
    }, 3000);
    // spaceship.current.style.display = "none";
  }

  useEffect(() => {
    // if(resetAnimation) {
      // setResetAnimation(false);
      // const timer = [];
      const timer = setTimeout(() => {
        setMouseGif(true);
      }, 3000);
      // timer[1] = setTimeout(() => {
      //   setMouseGif(false);
      // }, 5500);
      // timer[2] = setTimeout(() => {
      //   setSpaceshipImg(true);
      // }, 6000);
      // return () => timer.forEach(each => clearTimeout(each));
      return () => clearTimeout(timer);
    // }
  }, []);

  return (
    <div className="Apply">
    {/*  <div className="pageHeading">Apply for Your Cosmic Adventure</div>*/}
    {/*  <div className="applyContent">*/}
    {/*    <p>*/}
    {/*      Ready to embark on a journey to Planet Zz, the ultimate destination for leisure and exploration?*/}
    {/*    </p>*/}
    {/*    <p>*/}
    {/*      Fill out the application form below to apply for your visit to our extraordinary planet.*/}
    {/*    </p>*/}
    {/*    <ApplyForm />*/}
    {/*  </div>*/}
      <div className="Panes">
        <div className="leftPane">
          <img src={require("../img/apply/apply_0.jpg")} alt="Planet Zz" />
          <div className="imgLayer"></div>
          <div className="imgContent">
            <div className="imgHeading">A Whole New World..</div>
            {spaceshipImg && <motion.img
              className="gifImage spaceship" src={require("../img/apply/spaceship.png")} alt=""
              ref={spaceship}
              variants={spaceshipVariant}
              initial="hidden"
              animate="visible"
              onAnimationComplete={() => changeSpaceship()}
            />}
            <AnimatePresence onExitComplete={() => setResetAnimation(true)}>
            {spaceshipGif &&
              <motion.img
                ref={yoda}
                className="gifImage spaceship yoda" src={require("../img/apply/yoda.gif")} alt=""
                initial={{x: 0, opacity: 1}}
                exit={{x: -150, opacity: 0,
                  transition: {
                    duration: 0.2,
                    opacity: {delay: 0.1, duration: 0.1}
                }}}
                onLoad={() => setSpaceshipImg(false)}
              />
            }
            </AnimatePresence>
            {mouseGif &&
              <motion.img
                className="gifImage" src={require("../img/apply/mouse.gif")} alt=""
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.7}}
                onLoad={() => {
                  setTimeout(() => {
                    setSpaceshipImg(true);
                    setMouseGif(false);
                  }, 2400);
                }}
              />
            }
            {resetAnimation &&
              <motion.img
                className="gifImage" src={require("../img/apply/visualization.gif")} alt=""
                initial={{opacity: 0}}
                animate={{opacity: 1}}
              />
            }
          </div>
        </div>
        <div className="rightPane">
          <form>
            <label>First Name:</label>
            <input type="text" />

            <label>Last Name:</label>
            <input type="text" />

            <label>Email Address:</label>
            <input type="email" />

            <button className="nextBut" type="button">Next</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Apply;