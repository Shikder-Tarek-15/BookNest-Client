import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import RoomCard from "./RoomCard";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_LINK}/availableRooms`).then((res) => {
      setRooms(res.data);
    });
  }, []);

  useEffect(() => {
    const updateRoomAvailability = async () => {
      try {
        await axios.patch(
          `${import.meta.env.VITE_API_LINK}/updateRoomAvailability`
        );
      } catch (error) {
        console.error("Error updating room availability:", error);
      }
    };

    updateRoomAvailability();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = parseInt(e.target.start.value);
    const end = parseInt(e.target.end.value);
    const filterData = { start, end };

    await axios
      .post(`${import.meta.env.VITE_API_LINK}/filteredRooms`, filterData)
      .then((data) => {
        setRooms(data.data);
      });
  };

  console.log(rooms);
  return (
    <div>
      <Helmet>
        <title>Rooms</title>
      </Helmet>
      <div>
        <h2 className="text-center text-2xl">Filter By Price</h2>
        <form
          onSubmit={handleSubmit}
          className="flex gap-5 justify-center
        "
        >
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Start Price</span>
            </div>
            <input
              type="number"
              name="start"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">End Price</span>
            </div>
            <input
              type="number"
              name="end"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <button className="btn bg-orange-500 text-white mt-9" type="submit">
            Filter
          </button>
        </form>
      </div>
      <div className="overflow-x-auto">
        <h2 className="text-3xl font-bold text-center mt-8 mb-5">All Rooms</h2>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
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
