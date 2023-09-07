import {useParams} from "react-router-dom";
import NotFound from "./NotFound";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/bundle';

const Activity = ({ types }) => {
  const { type} = useParams();
  console.log(types[type]);
  return !types[type] ? <NotFound /> :
    (
    <div className="Activity">
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
        <SwiperSlide><img src={require("../img/aqua_0.jpg")} alt="Aerial" /></SwiperSlide>
        <SwiperSlide><img src={require("../img/aqua_1.jpg")} alt="Aqua" /></SwiperSlide>
        <SwiperSlide><img src={require("../img/aqua_2.jpg")} alt="Land" /></SwiperSlide>
      </Swiper>
      </div>
    </div>
  );
};

export default Activity;