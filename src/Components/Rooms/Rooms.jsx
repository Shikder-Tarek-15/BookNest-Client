import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import RoomCard from "./RoomCard";

const Rooms = () => {
  const rooms = useLoaderData();
  return (
    <div>
      <Helmet>
        <title>Rooms</title>
      </Helmet>

      <div className="overflow-x-auto">
        <h2 className="text-3xl font-bold text-center">All Rooms</h2>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Price</th>
              <th>Room Size</th>
              <th>Special Offer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room}></RoomCard>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rooms;
