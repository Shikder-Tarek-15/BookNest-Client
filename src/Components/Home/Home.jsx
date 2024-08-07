import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import FeaturedRooms from "./FeaturedRooms";
import Map from "./Map";
import Newsletter from "./Newsletter";
import ReviewCard from "./ReviewCard";
import Slider from "./Slider";

const Home = () => {
  const rooms = useLoaderData();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_LINK}/review`, { withCredentials: true })
      .then((res) => {
        setReviews(res.data);
      });
  }, []);

  const handleModal = () => {
    document.getElementById("my_modal_3").showModal();
  };

  useEffect(() => {
    handleModal();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* Modal  */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box p-0 m-0">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <img
            className=""
            src="https://i.ibb.co/s92xFLt/promotion.png"
            alt=""
          />
        </div>
      </dialog>

      <Slider />
      <div className="mt-12 text-center">
        <h2 className="font-bold text-3xl mb-5">Find Us Easily!</h2>
        <p>
          Discover the perfect stay with our conveniently located hotels. <br />{" "}
          Use the map below to see our exact location and plan your visit.
        </p>
      </div>
      <Map />

      <Newsletter />

      <div className="mt-12 text-center">
        <h2 className="font-bold text-3xl mb-5">Featured Rooms</h2>
        <p>
          Here is our feature rooms. <br />
          Please check it out
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {rooms?.slice(0, 6).map((room) => (
            <FeaturedRooms key={room._id} room={room}></FeaturedRooms>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="font-bold text-3xl mb-5">User Reviews</h2>
        <p>
          Here our Authentic user review. <br /> You can also give review after
          booking the room.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {reviews?.map((review) => (
            <ReviewCard key={review._id} review={review}></ReviewCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
