import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const MyBookings = () => {
  const [myBooks, setMyBooks] = useState([]);
  const { user } = useContext(AuthContext);
  const { userEmail, roomImage, roomDescription, roomId, start, end } = myBooks;
  const email = user.email;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_LINK}/myBookings/${email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMyBooks(res.data);
      });
  }, [email]);

  //   useEffect(()=>{
  //     axios
  //       .get(`${import.meta.env.VITE_API_LINK}/filteredRooms`, filterData)
  //       .then((data) => {
  //       });
  //   },[])

  const handleEdit = () => {};

  const handleDelete = () => {};

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
        <tbody>
          {myBooks.map((book, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={book?.roomImage} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{book.roomDescription}</div>
                  </div>
                </div>
              </td>
              <td>I am</td>
              <td>{book.comment}</td>
              <td>{new Date(book.time).toLocaleDateString()}</td>
              <td>
                <button onClick={handleEdit} className="text-xl">
                  <FaRegEdit />
                </button>
              </td>
              <td>
                <button onClick={handleDelete} className="text-xl">
                  <RiDeleteBin6Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
