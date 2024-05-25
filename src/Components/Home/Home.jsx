import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import FeaturedRooms from "./FeaturedRooms";
import Map from "./Map";
import Newsletter from "./Newsletter";
import Slider from "./Slider";

const Home = () => {
  const rooms = useLoaderData();
  console.log(rooms);
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
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
          {rooms.slice(0, 6).map((room) => (
            <FeaturedRooms key={room._id} room={room}></FeaturedRooms>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
