import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const RoomDetails = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
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

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [roomHasBooked, setRoomHasBooked] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  // This function should check if the user has booked the room.
  // For now, let's assume we have a simple function that sets this state.
  useEffect(() => {
    const roomId = _id;
    console.log(roomId);
    const data = { roomId };

    axios
      .post(`${import.meta.env.VITE_API_LINK}/checkBooked`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("CheckBooked Response:", res.data);
        if (res.data.length > 0) {
          setRoomHasBooked(true);
        } else {
          setRoomHasBooked(false);
        }
      })
      .catch((error) => {
        console.error("Error checking booking status:", error);
      });
  }, [_id, roomHasBooked]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setError("");
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = moment(startDate);
    const end = moment(endDate);
    const userEmail = user.email;
    const roomId = _id;
    console.log(userEmail);
    const data = { userEmail, roomDescription, roomImage, roomId, start, end };

    if (end.isBefore(start)) {
      setError("End date cannot be before start date.");
    } else {
      axios
        .post(`${import.meta.env.VITE_API_LINK}/bookingCollection`, data, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Room Booked Successfull",
              // text: `Welcome ${data?.user?.displayName}`,
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (res.data === "This room already booked") {
            Swal.fire({
              position: "center",
              icon: "error",
              title: res.data,
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

  // const handleReviewSubmit = (e) => {
  //   e.preventDefault();
  //   // Add logic to submit the review
  //   console.log("Review submitted:", reviewText, reviewRating);
  // };

  return (
    <div className=" mt-12 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 p-5 items-center bg-base-300 rounded-xl">
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
          <div className="flex flex-col md:flex-row md:justify-between">
            <div>
              <p className="border-b pb-2 mt-2">
                <span className="font-bold">Room Size: </span>
                {roomSize}
              </p>
              <h2 className="text-xl font-bold border-b pb-2 mt-2">
                More Details
              </h2>
              <p className="mb-3 mt-3">
                <span className="font-bold">Special Offer: </span>
                {specialOffers ? specialOffers : "No offer available"}
              </p>
              <p className="mt-2 mb-3 flex items-center gap-1">
                <span className="font-bold">Total Ratings: </span>
                {reviews.length}
              </p>
              <p className="mt-2 mb-3">
                <span className="font-bold">Availability: </span>
                <span className="bg-orange-400 text-white px-2 rounded-xl">
                  {availability ? "Available" : "Booked"}
                </span>
              </p>
              <p className="text-xl font-bold mb-2">
                <span className="font-black">Price: </span>
                {pricePerNight}$
              </p>
            </div>
            {/* Booking Form */}
            <div>
              <form onSubmit={handleSubmit}>
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
                <div className="flex justify-end mt-5">
                  {roomHasBooked ? (
                    <button
                      disabled
                      className="btn bg-orange-500 text-white "
                      type="submit"
                    >
                      Already Booked
                    </button>
                  ) : (
                    <button
                      className="btn bg-orange-500 text-white"
                      type="submit"
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {/* {roomHasBooked && (
        <div className="mt-12 p-5 bg-base-200 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="reviewText"
              >
                Your Review
              </label>
              <textarea
                id="reviewText"
                className="textarea textarea-bordered w-full"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="reviewRating"
              >
                Rating
              </label>
              <input
                id="reviewRating"
                type="number"
                className="input input-bordered w-full"
                value={reviewRating}
                onChange={(e) => setReviewRating(e.target.value)}
                min="0"
                max="5"
                required
              />
            </div>
            <div className="flex justify-end">
              <button className="btn bg-orange-500 text-white" type="submit">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )} */}

      <h2 className="text-3xl font-bold text-center mt-5 mb-5">User Reviews</h2>
      <div className="overflow-x-auto">
        {reviews.length === 0 && (
          <p className="font-bold text-center">
            No review available.. Please Write a review from My Booking section
          </p>
        )}
        <table className={`table ${reviews.length === 0 ? "hidden" : ""}`}>
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
            {reviews?.map((review, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{review.name}</td>
                <td>{review.rating}</td>
                <td>{review.comment}</td>
                <td>{moment(review.time).format("YYYY-MM-DD")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomDetails;
