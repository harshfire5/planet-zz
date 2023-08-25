const Home = () => {
  return (
    <div className="Home">
      <div className="pageHeading">
        Welcome to Planet Zz
      </div>
      <div className="homeDesc">
        <img src={require("../img/planet.jpg")} alt="Planet Zz" width="480px" height="320px"></img>
        <div>
          <p className="pageGreeting">Greetings, interstellar explorers and curious beings from far and wide!</p>
          <p>We are thrilled to extend a warm and cosmic welcome to our corner of the universe: Planet Zz.
             Join us in exploring the wonders of our celestial home and the boundless mysteries of the cosmos.
             Together, we'll embark on an interstellar journey like no other.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;