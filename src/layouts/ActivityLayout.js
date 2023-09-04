import {NavLink, useParams} from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import ActivityError from "../components/ActivityError";
import {flushSync} from "react-dom";
import Activity from "../components/Activity";
import useTypes from "../hooks/useTypes";
import {motion} from "framer-motion";

const loaderVariant = {
  animation: {
    x: [-20, 20],
    y: [0, -25],
    transition: {
      x: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse'
      },
      y: {
        duration: 0.25,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeOut'
      }
    }
  }
}

const activities = [
  "Aerial Adventures",
  "Aqua Escapades",
  "Land Lifestyles"
];

const ActivityLayout = () => {
  const { type } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const buttonRef = useRef([]);
  const activityRef = useRef([]);
  const videoRef = useRef(null);

  const performScroll = useCallback((index) => {
    console.log("index:",index);
    let ref = null;
    if (index === -1) {
      ref = videoRef.current;
    } else {
      buttonRef.current[index].className = "active";
      ref = activityRef.current[index];
    }
    // console.log("ref:",ref);
    ref.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });

    for(let i = 0; i < buttonRef.current.length; i++) {
      if(i !== index) {
        buttonRef.current[i].className = "";
      }
    }
  }, []);

  useEffect(() => {
    // console.log(window.innerHeight);
      document.body.style.overflowY = "hidden";
      setError(null);
      setLoading(true);
      fetch('http://localhost:8000/activities')
        .then(res => {
          if (!res.ok) {
            throw Error("No such activity exists!");
          }
          return res.json();
        }).then(val => {
        setLoading(false);
        setData(val);
        document.body.style.overflowY = "";
      })
        .catch(err => {
          setLoading(false);
          console.log(err.message)
          setError(err.message)
        })
  }, []);

  useEffect(() => {
    let current = -1;
    let isScrolling = false;
    let lastScrollPos = window.scrollY;

    const performWait = () => {
      document.body.style.overflowY = "hidden";
      performScroll(current);
      setTimeout(() => {
        // console.log("Last Position:", lastScrollPos);
        // console.log("Compare Position:", (current+1) * window.innerHeight);
        // console.log("Height:", window.innerHeight);
        document.body.style.overflowY = "";
        lastScrollPos = window.scrollY;
        isScrolling = false;
      }, 650);
    }

      function test() {
        // console.log("Trying to scroll, isScrolling:", isScrolling);
        // console.log("Current: ", current);
        if(!isScrolling) {
          if (window.scrollY > lastScrollPos && current < activities.length-1) {
            isScrolling = true;
            current += 1;
            // console.log("show next triggered with current:", current);
            performWait();
          }
          else if(window.scrollY < lastScrollPos && current > -1) {
            isScrolling = true;
            current -= 1;
            // console.log("show prev triggered with current:", current);
            performWait();
          }
        }
      }

      window.addEventListener("scroll", test);
  }, [performScroll]);

  return type ? (
    <ActivityError />
    ) : (
      <div className="ActivityLayout">
        <div ref={videoRef}>
          <video className="video" src={require("../vid/activities.mp4")} poster={require("../img/activities_poster.jpg")} autoPlay loop muted />
          <div className="videoHeading">Explore the unimaginable!</div>
        </div>
        {/*<nav>*/}
        {/*  <NavLink to="/activities/aerial">Aerial Adventures</NavLink>*/}
        {/*  <NavLink to="/activities/aqua">Aqua Escapades</NavLink>*/}
        {/*  <NavLink to="/activities/land">Land Lifestyles</NavLink>*/}
        {/*</nav>*/}
        {/*<div className="content">*/}
          {/*<p>*/}
          {/*  Welcome to Planet Zz's extraordinary playground of limitless leisure!*/}
          {/*  Here, life isn't just lived; it's an exhilarating celebration of fun, fueled by advanced technology and boundless imagination.*/}
          {/*  Delve into our three captivating categories of activities: Aerial Adventures, Aqua Escapades, and Land Lifestyles.*/}
          {/*</p>*/}
          {/*<p>*/}
          {/*  <strong>Aerial Adventures:</strong> Reach for the skies and experience gravity-defying thrills that will leave you breathless.*/}
          {/*</p>*/}
          {/*<p>*/}
          {/*  <strong>Aqua Escapades:</strong> Dive into the depths of our aquatic wonderland, where the mysteries of the deep await your discovery.*/}
          {/*</p>*/}
          {/*<p>*/}
          {/*  <strong>Land Lifestyles:</strong> Explore our unconventional terrestrial experiences, where reality is what you make it.*/}
          {/*</p>*/}
          {/*<p>*/}
          {/*  Each category offers an array of unique and unthinkable activities that challenge the limits of what's possible.*/}
          {/*  Prepare to be captivated, amazed, and utterly enthralled as you explore these futuristic adventures, each more mind-bending than the last.*/}
          {/*  Embrace the extraordinary and make every moment a cosmic memory!*/}
          {/*</p>*/}
          {/*<p>*/}
          {/*  <b>Join us on Planet Zz</b>, where leisure isn't just a pastime—it's a way of life.*/}
          {/*  Whether you're soaring high above, plunging below the waves, or exploring the unconventional on land, our world is a canvas for your imagination.*/}
          {/*  Step into the extraordinary, where the impossible becomes reality, and every day is an unforgettable adventure!*/}
          {/*</p>*/}

        {loading &&
          <div className="backdrop">
            <div className="loading">
              <motion.div
                className="loader"
                variants={loaderVariant}
                animate="animation"
              />
              <p>Loading</p>
            </div>
          </div>
        }

        <nav>
          {/*<button type="button">Prev</button>*/}
          {activities.map((activity, i) => (
              <button type="button"
                      key={i}
                      ref={ref => buttonRef.current[i] = ref}
                      onClick={() => performScroll(i)}
              >{activity}</button>
          ))}
          {/*<button type="button">Next</button>*/}
        </nav>
        {error && <div className="error">{error}</div>}

        {data && data.map((activity, i) => (
          <div ref={ref => activityRef.current[i] = ref} key={i}>
            <img src={require("../"+activity.url)} alt={activity.name} />
            <div className="imgLayer"></div>
            <div className="imgContent">
              <div>
                <p className="imgHeading">
                  {activity.name}
                  <button className="detailsButton" type="button">More Info</button>
                </p>
              </div>

              <p className="imgDesc">
                {activity.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
  );
}

export default ActivityLayout;