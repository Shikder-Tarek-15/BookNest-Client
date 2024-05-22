import { Link, useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
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

  // const handleClick = (id) => {
  //   console.log(id);
  // };
  const navigate = useNavigate();

  return (
    <tr
      className="cursor-pointer"
      onClick={() => navigate(`/roomDetails/${_id}`)}
    >
      {/* <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th> */}
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={roomImage} />
            </div>
          </div>
          <div>
            <div className="font-bold">{roomDescription}</div>
            <div className="text-sm opacity-50">
              Total Ratings: {reviews?.length}
            </div>
          </div>
        </div>
      </td>
      <td>${pricePerNight}</td>
      <td>{roomSize}</td>
      <td>{specialOffers}</td>
      <th>
        <Link to={`/roomDetails/${_id}`}>
          <button className="btn btn-ghost btn-xs bg-orange-500 text-white ">
            details
          </button>
        </Link>
      </th>
    </tr>
  );
};

export default RoomCard;
