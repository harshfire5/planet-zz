import {useCallback, useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";

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

const Activities = ({ types }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [initialIndex, setInitialIndex] = useState(-1);
  const [abortCont, setAbortCont] = useState(null);
  const buttonRef = useRef([]);
  const activityRef = useRef([]);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // console.log(data);

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
            throw Error("Couldn't fetch repository");
          }
          return res.json();
        }).then(val => {
        setLoading(false);
        setData(val);
        document.body.style.overflowY = "";
        })
        .catch(err => {
          setLoading(false);
          console.log(err.message);
          setError(err.message);
        })
  }, []);

  useEffect(() => {
    if(data) {
      let current = initialIndex;
      let isScrolling = false;
      let lastScrollPos = window.scrollY;

      const controller = new AbortController();
      const {signal} = controller;
      setAbortCont(controller);

      const performWait = () => {
        document.body.style.overflowY = "hidden";
        // controller.abort(signal);
        performScroll(current);
        setTimeout(() => {
          // console.log("Last Position:", lastScrollPos);
          // console.log("Compare Position:", (current+1) * window.innerHeight);
          // console.log("Height:", window.innerHeight);
          document.body.style.overflowY = "";
          lastScrollPos = window.scrollY;
          isScrolling = false;
        }, 700);
      }

      function scroll() {
        console.log("Trying to scroll, isScrolling:", isScrolling);
        // console.log("Current: ", current);
        if (!isScrolling) {
          if (window.scrollY > lastScrollPos && current < data.length - 1) {
            isScrolling = true;
            current += 1;
            // console.log("show next triggered with current:", current);
            performWait();
          } else if (window.scrollY < lastScrollPos && current > -1) {
            isScrolling = true;
            current -= 1;
            // console.log("show prev triggered with current:", current);
            performWait();
          }
        }
      }

      window.addEventListener("wheel", scroll, {signal});
    }
  }, [data, initialIndex, performScroll]);

  const buttonScroll = (index) => {
    if(data) {
      const {signal} = abortCont;
      abortCont.abort(signal);
      performScroll(index);
      setInitialIndex(index);
    }
  };

  return (
    <div className="Activities">
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
        {Object.values(types).map((activity, i) => (
            <button type="button"
                    key={i}
                    ref={ref => buttonRef.current[i] = ref}
                    onClick={() => buttonScroll(i)}
            >{activity}</button>
        ))}
        {/*<button type="button">Next</button>*/}
      </nav>
      {error && <div className="error">{error}</div>}

      {data && data.map((activity, i) => (
        <div ref={ref => activityRef.current[i] = ref} key={i}>
          <img src={require("../"+activity.url)} alt={activity.name} />
          <div className="imgLayer"></div>
          <div className="imgContent" onClick={() => navigate(activity.alias)}>
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

export default Activities;