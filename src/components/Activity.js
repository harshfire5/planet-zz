import {useParams} from "react-router-dom";
import NotFound from "./NotFound";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/bundle';
import ReactParallaxTilt from "react-parallax-tilt";
import {useEffect, useState} from "react";
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

const Activity = ({ types }) => {
  const { type} = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  console.log(types[type]);

  useEffect(() => {
    fetch("http://localhost:8000/"+type)
      .then(res => {
        if(!res.ok) {
          throw Error("No such activity exists!");
        }
        return res.json();
      }).then(val => {
        console.log(val);
        setData(val);
        setLoading(false);
      }).catch(err => {
        setLoading(false);
        console.log(err.message);
        setError(err.message);
      })
  }, [type]);

  return !types[type] ? <NotFound /> :
    (
    <div className="Activity">
      {/*<h1>{types[type]}</h1>*/}
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
      {error && <div className="error">{error}</div>}

      <div className="bg_image"></div>
      <div className="SwiperContainer">
      <Swiper
        loop={true}
        // spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide changed")}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{
          dynamicBullets: true
        }}
        navigation
        autoplay={{
          delay: 3000
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="SwiperCarousel"
      >
        <div className="carouselTextLayer"></div>
        <div className="carouselText">{types[type]}</div>
        <div className="carouselDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet sollicitudin sapien, et venenatis enim dictum in.</div>
        <SwiperSlide><img src={require("../img/aqua_0.jpg")} alt="Aerial" /></SwiperSlide>
        <SwiperSlide><img src={require("../img/aqua_1.jpg")} alt="Aqua" /></SwiperSlide>
        <SwiperSlide><img src={require("../img/aqua_2.jpg")} alt="Land" /></SwiperSlide>
      </Swiper>
      </div>

      {data &&
        <div className="tiltElements">
          {data.map(activity => (
            <ReactParallaxTilt className="tilt" key={activity.id}>
              <div className="activityList">
                <img src={require("../" + activity.url)} alt={activity.name}/>
                <div className="imgHeading">{activity.name}</div>
              </div>
            </ReactParallaxTilt>
          ))}
        </div>
      }

    </div>
  );
};

export default Activity;