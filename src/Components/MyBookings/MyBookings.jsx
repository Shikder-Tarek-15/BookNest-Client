import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const [myBooks, setMyBooks] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user.email;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_LINK}/myBookings/${email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMyBooks([]);
      });
  }, [email]);
  return (
    <div>
      <h2
        className="text-3xl font-bold text-center mt-6
       mb-6"
      >
        My Booked Room
      </h2>
      {myBooks.length === 0 && (
        <p className="text-center font-bold">
          You dont book any room.{" "}
          <Link to="/rooms" className="text-blue-700">
            click here
          </Link>{" "}
          to book
        </p>
      )}
      <table className={`table ${myBooks.length === 0 ? "hidden" : ""}`}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default MyBookings;
