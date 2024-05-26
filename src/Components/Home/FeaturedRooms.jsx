import { Link } from "react-router-dom";

const FeaturedRooms = ({ room }) => {
  return (
    <Link to={`/roomDetails/${room._id}`}>
      <div className="max-w-lg  shadow-md  rounded-xl p-5 h-full shadow-orange-400 bg-base-200">
        <div className="space-y-4 text-start">
          <div className="space-y-2">
            <img
              src={room.roomImage}
              alt=""
              className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
            />
          </div>
          <div className="space-y-2">
            <small>
              <span className="font-bold"> Special:</span>{" "}
              {room?.specialOffers ? room.specialOffers : "Not available"}
            </small>
            <h3 className="text-xl font-semibold dark:text-violet-600">
              {room.roomDescription}
            </h3>
            <p className="text-gray-500">
              <span className="font-bold text-black">Price:</span> $
              {room?.pricePerNight}
            </p>
            <p className="leading-snug dark:text-gray-600">
              Total Review: {room.reviews.length}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedRooms;
