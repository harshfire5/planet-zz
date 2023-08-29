import {NavLink, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
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

const ActivityLayout = () => {
  const { type } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const activityRef = useRef(null);
  // const {types, isRightType} = useTypes(type);

  useEffect(() => {
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
        flushSync(() =>
          setData(val)
        )
        // console.log(data)
        // activityRef.current.scrollIntoView({
        //   behavior: "smooth"
        // });
      })
        .catch(err => {
          setLoading(false);
          console.log(err.message)
          setError(err.message)
        })
  }, []);

  return type ? (
    <ActivityError />
    ) : (
      <div className="ActivityLayout">
        <div>
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

        {/*  {loading && <motion.div*/}
        {/*    className="loader"*/}
        {/*    variants={loaderVariant}*/}
        {/*    animate="animation"*/}
        {/*  />}*/}
        {/*  {error && <div className="error">{error}</div>}*/}
        {/*  {data &&*/}
        {/*    <div ref={activityRef}>*/}
        {/*      /!*<Activity name={types[type]} data={data}/>*!/*/}

        {/*    </div>}*/}
        {/*</div>*/}
        {loading && <motion.div
            className="loader"
            variants={loaderVariant}
            animate="animation"
          />}
        <nav>
          {error && <div className="error">{error}</div>}
          { data && data.map(activity => (
              <a key={activity.id} href="#">{activity.name}</a>
          ))}
        </nav>

        { data && data.map(activity => (
          <div key={activity.id}>
            <div ref={activityRef}>
              <img src={require("../"+activity.url)} alt={activity.name} />
              <div className="imgLayer"></div>
              <div className="imgContent">
                <p className="imgHeading">{activity.name}</p>
                <p className="imgDesc">
                  {activity.desc}
                </p>
                <button className="detailsButton" type="button">More Info</button>
              </div>
            </div>
          </div>
        ))}

      {/*  <div>*/}
      {/*    <img src={require("../img/aqua.jpg")} alt="Aqua Escapades" />*/}
      {/*    <div className="imgLayer"></div>*/}
      {/*    <div className="imgContent">*/}
      {/*      <p className="imgHeading">Aqua Escapades</p>*/}
      {/*      <p className="imgDesc">*/}
      {/*        Plunge into the deep, where endless mysteries await your exploration.*/}
      {/*      </p>*/}
      {/*      <button className="detailsButton" type="button">More Info</button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      </div>
  );
}

export default ActivityLayout;