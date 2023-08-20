import {NavLink, Outlet, useParams} from "react-router-dom";
import AerialActivities from "./AerialActivities";
import Aquavities from "./Aquavities";
import Groundivities from "./Groundivities";

const ActivityLayout = () => {
  const { type } = useParams();
  console.log(type);
  return (
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
      </div>

      {type === "aerial" && <AerialActivities />}
      {type === "aqua" && <Aquavities />}
      {type === "land" && <Groundivities />}

      {/*<Outlet />*/}
    </div>
  );
};

export default ActivityLayout;

export const activityLoader = async ({ params }) => {
  let error = null;
  let data = null;
  const { type } = params;
  const allTypes = ["aerial", "aqua", "land"]
  // console.log(params);
  if(allTypes.includes(type)) {
    const res = await fetch('http://localhost:8000/' + type)
      .then(res => {
        return res;
      })
      .catch(e =>
        error = e.message
      )
    if (res.ok) {
      data = res.json();
    }
  }
  return [await data, error]
}