import { Link } from "react-router-dom";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const Slider = () => {
  return (
    <Swiper
      className="max-h-[500px] mt-12 rounded-xl"
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {/* Slide-1 */}
      <SwiperSlide>
        <div
          className="bg-cover bg-no-repeat bg-center w-full h-[500px] flex justify-center items-center mb-8"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.ibb.co/Jd8zSBp/hotel-1.jpg')",
          }}
        >
          <div className="text-center space-y-5 text-white">
            <h1 className="text-3xl font-bold">
              Lets check out our modern rooms
            </h1>
            <p className="pb-5">Here is our most beautiful rooms</p>
            <Link to="/rooms">
              <button className="bg-orange-500 text-white border-none btn">
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
      {/* Slide-2 */}
      <SwiperSlide>
        <div
          className="bg-cover bg-no-repeat bg-center w-full h-[500px] flex justify-center items-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.ibb.co/9tN4gZF/hotel-2.jpg')",
          }}
        >
          <div className="text-center space-y-5 text-white">
            <h1 className="text-3xl font-bold">
              Lets check out our modern rooms
            </h1>
            <p className="pb-5">Here is our most beautiful rooms</p>
            <Link to="/rooms">
              <button className="bg-orange-500 text-white border-none btn">
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
      {/* Slide-3 */}
      <SwiperSlide>
        <div
          className="bg-cover bg-no-repeat bg-center w-full h-[500px] flex justify-center items-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.ibb.co/zJfCYZY/hotel-3.webp')",
          }}
        >
          <div className="text-center space-y-5 text-white">
            <h1 className="text-3xl font-bold">
              Lets check out our modern rooms
            </h1>
            <p className="pb-5">Here is our most beautiful rooms</p>
            <Link to="/rooms">
              <button className="bg-orange-500 text-white border-none btn">
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
      {/* Slide-4 */}
      <SwiperSlide>
        <div
          className="bg-cover bg-no-repeat bg-center w-full h-[500px] flex justify-center items-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.ibb.co/xjTw9Mc/hotel-4.webp')",
          }}
        >
          <div className="text-center space-y-5 text-white">
            <h1 className="text-3xl font-bold">
              Lets check out our modern rooms
            </h1>
            <p className="pb-5">Here is our most beautiful rooms</p>
            <Link to="/rooms">
              <button className="bg-orange-500 text-white border-none btn">
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
export default Slider;
