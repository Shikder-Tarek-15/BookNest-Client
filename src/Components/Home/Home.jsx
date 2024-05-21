import Map from "./Map";
import Newsletter from "./Newsletter";
import Slider from "./Slider";

const Home = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;
