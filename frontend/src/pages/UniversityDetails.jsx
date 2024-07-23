import React, { useEffect, useState } from "react";
import AppLayout from "../components/user/AppLayout";
import { useLocation } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useUserContext from "../context/UserContext";
import Modal from "../components/Modal";
import useCreateReview from "../hooks/useCreateReview";
import Review from "../components/Review";
import { calculateAverageRating } from "../utils/calculateAverageRating";
import useGetUniversityDetails from "../hooks/useGetUniversityDetails";
import Loader from "../components/Loader";

import { Toaster } from "react-hot-toast";
import Map from "../components/Map";

const UniversityDetails = () => {
  const location = useLocation();
  const { universityId } = location.state || {};

  const [university, setUniversity] = useState();
  const [reviews, setReviews] = useState([]);
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
  });

  const [isLocationDataValid, setIsLocationDataValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { createReview } = useCreateReview();
  const { user } = useUserContext();
  const { loading, getUniversityDetails } = useGetUniversityDetails();

  const [inputs, setInputs] = useState({
    user: user?._id,
    university: universityId,
    rating: 1,
    review: "",
  });
  const handleModalOpen = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleAddReview = async (evt) => {
    evt.preventDefault();
    const newReview = await createReview(inputs);
    if (newReview !== undefined) {
      setReviews([...reviews, newReview]);
      setInputs({
        user: user?._id,
        university: universityId,
        rating: 1,
        review: "",
      });
      setIsModalOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  const handleReviewDeletion = (deletedReviewId) => {
    const updatedReviews = reviews.filter(
      (review) => review._id !== deletedReviewId
    );
    setReviews(updatedReviews);
  };

  const handleReviewEdit = (editedReviewId, editedReviewData) => {
    const index = reviews.findIndex((review) => review._id === editedReviewId);
    if (index !== -1) {
      const updatedReviews = [...reviews];
      updatedReviews[index] = { ...updatedReviews[index], ...editedReviewData };
      setReviews(updatedReviews);
    }
  };

  useEffect(() => {
    async function fetchUniversityDetails() {
      setIsLoading(true);
      try {
        const response = await getUniversityDetails(universityId);

        setUniversity(response.university);
        setLocationData({
          latitude: response.geocode.latitude,
          longitude: response.geocode.longitude,
        });
        setReviews(response.university.reviews);
        setIsLocationDataValid(true);
      } catch (error) {
        setIsLocationDataValid(false);
        console.error("Error geocoding address:", error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUniversityDetails();
  }, []);

  return (
    <AppLayout>
      <div>
        {loading && isLoading ? (
          <Loader title="University Details" />
        ) : (
          university && (
            <div
              key={university._id}
              className={`w-[90%] mx-auto my-6 ${
                isModalOpen && "bg-slate-400 bg-opacity-5"
              }`}
            >
              <div>
                <img
                  className="{university.name === 'Gandaki University' || university.name === 'Pokhara University' ?w-full : w-24} h-24"
                  src={`http://localhost:8000/static/logos/${university.logo}`}
                  alt="uni logo"
                />
              </div>
              <h2 className="text-3xl font-bold text-slate-700 my-4">
                {university.name}
              </h2>
              <div className="w-full my-6 text-justify text-slate-600">
                {university.description}
              </div>
              <div className="flex justify-between flex-wrap items-center gap-6 py-4 w-full">
                <div className="w-[100%] xl:w-[40%] flex flex-col gap-10 bg-slate-100 p-4 rounded-lg">
                  <div className="w-full flex justify-start items-center">
                    <div className="text-lg text-slate-600 font-semibold my-4">
                      Year of Establishment:
                    </div>
                    <h2 className=" text-slate-500 text-base px-8">
                      {university.establishedYear}
                    </h2>
                  </div>

                  <div className="w-full flex justify-start items-center">
                    <div className="text-lg text-slate-600 font-semibold my-4">
                      Location:
                    </div>
                    <h2 className=" text-slate-500 text-base px-8">
                      {university.location}
                    </h2>
                  </div>

                  <div className="w-full flex justify-start items-center">
                    <div className="text-lg text-slate-600 font-semibold my-4">
                      Category:
                    </div>
                    <h2 className=" text-slate-500 text-base px-8">
                      {university.category}
                    </h2>
                  </div>

                  <div className="w-full flex justify-start items-center">
                    <div className="text-lg text-slate-600 font-semibold my-4">
                      Website Url:
                    </div>
                    <div>
                      <a
                        href={`http://${university.websiteUrl}`}
                        target="_blank"
                        className=" text-blue-400 text-base px-8 underline hover:text-blue-600"
                      >
                        {university.websiteUrl}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-[100%] xl:w-[50%] rounded-lg">
                  {!isLoading && isLocationDataValid ? (
                    <div className="rounded-xl">
                      <Map
                        lat={locationData.latitude}
                        lng={locationData.longitude}
                        uniName={university.name}
                        uniLoc={university.location}
                      />
                    </div>
                  ) : (
                    <>
                      <MapContainer className="h-[400px]">
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                      </MapContainer>
                      {!isLoading && (
                        <div className="text-center font-sm text-slate-600 my-4 animate-pulse">
                          No geocode data found for {university.name}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <h2 className="text-4xl font-bold text-slate-600 py-8">
                {" "}
                Reviews_
              </h2>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-slate-600 text-base">Total Reviews</h2>
                  <p className="text-4xl text-slate-600 font-bold py-4">
                    {reviews?.length}
                  </p>
                </div>
                <div>
                  <h2 className="text-slate-600 text-base">Average Rating</h2>

                  {reviews?.length > 0 ? (
                    <p className="text-4xl text-slate-600 font-bold py-4">
                      {calculateAverageRating(reviews)} &#9733;
                    </p>
                  ) : (
                    <p className="text-4xl text-slate-600 font-bold py-4">
                      0.0
                    </p>
                  )}
                </div>
                <div>
                  <ul>
                    <li>
                      <div className="flex gap-2 items-center py-1 text-slate-600 text-base">
                        <svg
                          className="w-4 h-4 text-green-700 ms-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        5 excelllent
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-2 items-center py-1 text-slate-600 text-base">
                        <svg
                          className="w-4 h-4 text-green-400 ms-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        4 good
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-2 items-center py-1 text-slate-600 text-base">
                        <svg
                          className="w-4 h-4 text-yellow-300 ms-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        3 average
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-2 items-center py-1 text-slate-600 text-base">
                        <svg
                          className="w-4 h-4 text-orange-300 ms-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        2 below average
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-2 items-center py-1 text-slate-600 text-base">
                        <svg
                          className="w-4 h-4 text-red-400 ms-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        1 poor
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="my-10 border-[1px] border-slate-100"></div>
              {reviews && reviews.length > 0 ? (
                <div>
                  {reviews.map((review, reviewIdx) => (
                    <div key={reviewIdx}>
                      <Review
                        review={review}
                        onDelete={handleReviewDeletion}
                        onEdit={handleReviewEdit}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center bg-slate-500 text-white mt-16 p-12 rounded-md">
                  No reviews found
                </div>
              )}

              {user ? (
                <div>
                  <button
                    className="border-2 outline-none border-slate-400 rounded-md px-4 py-2 mt-4 hover:bg-slate-400 hover:text-slate-50"
                    onClick={handleModalOpen}
                  >
                    Add Review
                  </button>
                </div>
              ) : (
                ""
              )}

              {isModalOpen && (
                <>
                  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
                  <Modal onClose={handleModalClose}>
                    <h2 className="text-3xl text-slate-700 font-semibold my-4">
                      Add Review
                    </h2>
                    <form action="">
                      <div className="flex flex-col gap-2 my-6">
                        <label
                          htmlFor="rating"
                          className="font-xl font-semibold text-slate-600"
                        >
                          Rating:
                        </label>
                        <input
                          type="number"
                          name="rating"
                          min={1}
                          max={5}
                          value={inputs.rating}
                          onChange={(evt) =>
                            setInputs({ ...inputs, rating: evt.target.value })
                          }
                          placeholder="your rating towards university here"
                          className="text-grey-dark-1 border-2 p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3 "
                        />
                        <p className="text-sm text-slate-500">
                          Rating should be between 1 and 5
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 my-6">
                        <label
                          htmlFor="review"
                          className="font-xl font-semibold text-slate-600"
                        >
                          Review:
                        </label>
                        <textarea
                          rows={10}
                          name="review"
                          value={inputs.review}
                          onChange={(evt) =>
                            setInputs({ ...inputs, review: evt.target.value })
                          }
                          placeholder="your review here"
                          className="text-grey-dark-1 border-2 p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3 "
                        />
                        <p className="text-sm text-slate-500">
                          Review length should be atleast 50 characters long
                        </p>
                      </div>
                    </form>
                    <div className="flex justify-between items-center">
                      <button
                        className="boutline-none bg-green-600 text-slate-100 px-4 py-1 rounded-md tracking-wider hover:bg-green-500"
                        onClick={handleAddReview}
                      >
                        Submit
                      </button>
                      <button
                        className="outline-none bg-red-600 text-slate-100 px-4 py-1 rounded-md tracking-wider hover:bg-red-500"
                        onClick={handleModalClose}
                      >
                        Cancel
                      </button>
                    </div>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Magnam quisquam accusantium quae possimus ea eveniet
                      nesciunt nihil aliquid quas animi ipsum, fugiat ab rerum
                      deserunt maiores tempore. Quia et, iste blanditiis unde
                      tempore animi non itaque, ut sequi amet ab praesentium!
                      Dolorem amet quidem sunt vel a hic, aut autem, aliquam id
                      necessitatibus nulla nesciunt iure consectetur eum
                      assumenda facilis!
                    </p>
                  </Modal>
                </>
              )}
            </div>
          )
        )}
      </div>
      <Toaster />
    </AppLayout>
  );
};

export default UniversityDetails;
