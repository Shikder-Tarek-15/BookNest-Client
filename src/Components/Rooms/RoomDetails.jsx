import { useLoaderData } from "react-router-dom";

const RoomDetails = () => {
  const room = useLoaderData();
  const {
    _id,
    roomDescription,
    pricePerNight,
    roomSize,
    availability,
    roomImage,
    specialOffers,
    reviews,
  } = room;
  return (
    <div className=" mt-12 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 p-5 items-center bg-base-300  rounded-xl">
        <div>
          <img
            className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
            src={roomImage}
            alt=""
          />
          <figcaption className="text-center">{roomDescription}</figcaption>
        </div>
        <div>
          <h2 className="text-3xl font-bold border-b pb-5">
            {roomDescription}
          </h2>
          <p className=" border-b pb-2 mt-2">
            <span className="font-bold">Room Size: </span>
            {roomSize}
          </p>
          <h2 className="text-xl font-bold border-b pb-2 mt-2">More Details</h2>
          <p className=" mb-3 mt-3">
            <span className="font-bold ">Special Offer: </span>
            {specialOffers}
          </p>
          <p className=" mt-2 mb-3 flex items-center gap-1">
            <span className="font-bold">Total Ratings: </span>
            {reviews.length}
          </p>
          <p className="mt-2 mb-3 ">
            <span className="font-bold">Availability: </span>
            <span className="bg-orange-400 text-white px-2 rounded-xl">
              {availability ? "Available" : "Booked"}
            </span>
          </p>
          <p className="text-xl font-bold mb-2">
            <span className="font-black">Price: </span>
            {pricePerNight}$
          </p>
          <div className="flex justify-end">
            <button className="btn bg-orange-500 text-white">Book Now</button>
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-center mt-5 mb-5">User Review</h2>
      {/* start */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {/* {reviews?.map((idx) => ( */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>12-5-24</td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
      {/* end */}
    </div>
  );
};

export default RoomDetails;
