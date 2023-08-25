import {NavLink, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import ActivityError from "../components/ActivityError";
import {flushSync} from "react-dom";
import Activity from "../components/Activity";
import useTypes from "../useTypes";

const ActivityLayout = () => {
  const { type } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const activityRef = useRef(null);
  const {types, isRightType} = useTypes(type);

  useEffect(() => {
    if(isRightType()) {
      setError(null);
      setLoading(true);
      fetch('http://localhost:8000/' + type)
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
        activityRef.current.scrollIntoView({
          behavior: "smooth"
        });
      })
        .catch(err => {
          setLoading(false);
          console.log(err.message)
          setError(err.message)
        })
    }
  }, [isRightType, type]);

  return type && !isRightType() ? (
    <ActivityError />
    ) : (
      <div className="ActivityLayout">
        <div className="pageHeading">Activities</div>
        <div className="content">
          <p>
            Welcome to Planet Zz's extraordinary playground of limitless leisure!
            Here, life isn't just lived; it's an exhilarating celebration of fun, fueled by advanced technology and boundless imagination.
            Delve into our three captivating categories of activities: Aerial Adventures, Aqua Escapades, and Land Lifestyles.
          </p>
          <p>
            <strong>Aerial Adventures:</strong> Reach for the skies and experience gravity-defying thrills that will leave you breathless.
          </p>
          <p>
            <strong>Aqua Escapades:</strong> Dive into the depths of our aquatic wonderland, where the mysteries of the deep await your discovery.
          </p>
          <p>
            <strong>Land Lifestyles:</strong> Explore our unconventional terrestrial experiences, where reality is what you make it.
          </p>
          <p>
            Each category offers an array of unique and unthinkable activities that challenge the limits of what's possible.
            Prepare to be captivated, amazed, and utterly enthralled as you explore these futuristic adventures, each more mind-bending than the last.
            Embrace the extraordinary and make every moment a cosmic memory!
          </p>
          <p>
            <b>Join us on Planet Zz</b>, where leisure isn't just a pastime—it's a way of life.
            Whether you're soaring high above, plunging below the waves, or exploring the unconventional on land, our world is a canvas for your imagination.
            Step into the extraordinary, where the impossible becomes reality, and every day is an unforgettable adventure!
          </p>
          <nav>
            <NavLink to="/activities/aerial">Aerial Adventures</NavLink>
            <NavLink to="/activities/aqua">Aqua Escapades</NavLink>
            <NavLink to="/activities/land">Land Lifestyles</NavLink>
          </nav>

          {loading && <div className="loader"></div>}
          {error && <div className="error">{error}</div>}

          {data &&
            <div ref={activityRef}>
              <Activity name={types[type]} data={data}/>
            </div>}
        </div>
      </div>
  );
}

export default ActivityLayout;