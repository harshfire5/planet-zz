import {useParams} from "react-router-dom";
import NotFound from "./NotFound";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectCreative, Navigation, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/bundle';
import ReactParallaxTilt from "react-parallax-tilt";
import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import Modal from "./Modal";

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

const carouselVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.4
    }
  }
}

const tilesVariant = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}


const Activity = ({ types }) => {
  const { type} = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [modalPos, setModalPos] = useState(null);
  const tiles = useRef([]);
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

  const handleModal = (id, index) => {
    let filteredVal = data.filter(activity =>
      activity.id === id
    )
    // console.log(tiles.current[index].getBoundingClientRect());
    const tilePosDetails = tiles.current[index].getBoundingClientRect();
    // console.log(tilePosDetails);
    let x = tilePosDetails.x + (tilePosDetails.width / 4);
    let y = tilePosDetails.y + (tilePosDetails.height / 4);
    // console.log("x:", x);
    // console.log("y:", y);
    setModalPos({x, y});
    setModalData(filteredVal);
  }

  const changeModalData = (val) => {
    setModalData(val);
  }

  return !types[type] ? <NotFound /> :
    (
    <div className="Activity">
      {/*<h1>{types[type]}</h1>*/}
      {error && <div className="error">{error}</div>}
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

      <div className={"bg_image bg_"+type}></div>
      {data &&
        <>
          <motion.div
            className="SwiperContainer"
            variants={carouselVariant}
            initial="hidden"
            animate="visible"
          >
          <Swiper
            loop={true}
            // spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide changed")}
            onSwiper={(swiper) => console.log(swiper)}
            effect={"creative"}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ['-20%', 0, -1],
              },
              next: {
                translate: ['100%', 0, 0],
              }
            }}
            pagination={{
              dynamicBullets: true
            }}
            navigation
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            modules={[Pagination, Navigation, Autoplay, EffectCreative]}
            className="SwiperCarousel"
          >
            <div className="carouselTextLayer"></div>
            <div className="carouselText">{types[type]}</div>
            <div className="carouselDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet sollicitudin sapien, et venenatis enim dictum in.</div>
            <SwiperSlide><img src={require("../img/"+type+"/"+type+"_0.jpg")} alt={types[type]} /></SwiperSlide>
            <SwiperSlide><img src={require("../img/"+type+"/"+type+"_1.jpg")} alt={types[type]} /></SwiperSlide>
            <SwiperSlide><img src={require("../img/"+type+"/"+type+"_2.jpg")} alt={types[type]} /></SwiperSlide>
          </Swiper>
          </motion.div>

          {/*{data &&*/}
            <div className="tiltElements">
              {data.map((activity, i) => (
                <motion.div
                  key={i}
                  variants={tilesVariant}
                  viewport={{once: true, amount: 0.3}}
                  initial="hidden"
                  whileInView="visible"
                >
                <ReactParallaxTilt className="tilt">
                  <div ref={ref => tiles.current[i] = ref}
                       className="activityList" onClick={() => handleModal(activity.id, i)}>
                    <img src={require("../" + activity.url)} alt={activity.name}/>
                    <div className="imgHeading">{activity.name}</div>
                  </div>
                </ReactParallaxTilt>
                </motion.div>
              ))}
            </div>
          {/*}*/}

          {/*{modalData &&*/}
          {/*  modalData.map(activity => (*/}
          {/*    <>*/}
          {/*      <div className="backdrop" onClick={() => closeModal()}></div>*/}
          {/*      <div className="modal">*/}
          {/*        <img src={require("../" + activity.url)} alt={activity.name}/>*/}
          {/*        <p className="modalHeading">{activity.name}</p>*/}
          {/*        <p>{activity.desc}</p>*/}
          {/*        <div className="closeButton" onClick={() => closeModal()}>*/}
          {/*          <img src={require("../img/close.png")} alt="close"/>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </>*/}
          {/*  ))*/}
          {/* }*/}
          { modalData && <Modal type="activity" modalData={modalData} changeModalData={changeModalData} modalPos={modalPos} />}
        </>}
    </div>
  );
};

export default Activity;