import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const MyBookings = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
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

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setError("");
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setError("");
  };

  const handleEdit = (_id) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const userEmail = user.email;
    const roomId = _id;
    console.log(userEmail);
    const data = { userEmail, roomId, start, end };

    if (end.isBefore(start)) {
      setError("End date cannot be before start date.");
    } else {
      axios
        .patch(`${import.meta.env.VITE_API_LINK}/updateBooking`, data, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Updated Successfully",
              // text: `Welcome ${data?.user?.displayName}`,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something went wrong",
              // text: `Welcome ${data?.user?.displayName}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        axios
          .delete(`${import.meta.env.VITE_API_LINK}/deleteBooking/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const filteredData = myBooks.filter((book) => book._id !== id);
              setMyBooks(filteredData);

              Swal.fire({
                title: "Deleted!",
                text: "Your booking has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleReview = (id) => {
    const submitTime = new Date().toISOString();
    console.log(submitTime);
    const data = {
      id,
      rating,
      comment,
      submitTime,
    };

    axios
      .patch(`${import.meta.env.VITE_API_LINK}/submitReview`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Review Submitted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setRating("");
          setComment("");
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed to Submit Review",
            text: res.data.message,
            showConfirmButton: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to Submit Review",
          text: "An error occurred while submitting your review.",
          showConfirmButton: true,
        });
      });
  };

  return (
    <div>
      <Helmet>
        <title>My Bookings</title>
      </Helmet>
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
      <div className="overflow-x-auto">
        <table className={`table ${myBooks.length === 0 ? "hidden" : ""} `}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
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
                <td>{new Date(book.start).toLocaleDateString()}</td>
                <td>{new Date(book.end).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                  >
                    <FaRegEdit />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-xl"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_6").showModal()
                    }
                    className="text-x btn bg-orange-500 text-white"
                  >
                    Review
                  </button>
                </td>

                {/* Edit Modal section */}
                <dialog
                  id="my_modal_5"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Booking</h3>
                    <div>
                      <form
                        method="dialog"
                        onSubmit={() => handleEdit(book._id)}
                      >
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Start Date</span>
                          </div>
                          <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            className="input input-bordered w-full max-w-xs"
                            required
                          />
                        </label>
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">End Date</span>
                          </div>
                          <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            className="input input-bordered w-full max-w-xs"
                            required
                          />
                        </label>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="flex mt-5 modal-action">
                          <button
                            className="btn bg-orange-500 text-white"
                            type="submit"
                          >
                            Update Now
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </dialog>
                {/* Edit modal End */}
                {/* Review modal */}
                <dialog
                  id="my_modal_6"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Rating</h3>
                    <div>
                      <form
                        method="dialog"
                        onSubmit={() => handleReview(book.roomId)}
                      >
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Username</span>
                          </div>
                          <input
                            type="text"
                            name="name"
                            defaultValue={user.displayName}
                            disabled
                            className="input input-bordered w-full max-w-xs"
                            required
                          />
                        </label>
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Rating</span>
                          </div>
                          <input
                            type="text"
                            name="rating"
                            value={rating}
                            onChange={handleRatingChange}
                            placeholder="Enter rating 1-5"
                            className="input input-bordered w-full max-w-xs"
                            required
                          />
                        </label>
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Comment</span>
                          </div>
                          <input
                            type="text"
                            name="comment"
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Enter Comment"
                            className="input input-bordered w-full max-w-xs"
                            required
                          />
                        </label>

                        <div className=" mt-5 modal-action">
                          <button
                            className="btn bg-orange-500 text-white"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </dialog>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
