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

  const handleClick = (id) => {
    console.log(id);
  };

  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={roomImage} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{roomDescription}</div>
            <div className="text-sm opacity-50">Total Ratings: </div>
          </div>
        </div>
      </td>
      <td>${pricePerNight}</td>
      <td>{roomSize}</td>
      <td>{specialOffers}</td>
      <th>
        <button
          onClick={() => handleClick(_id)}
          className="btn btn-ghost btn-xs"
        >
          details
        </button>
      </th>
    </tr>
  );
};

export default RoomCard;
