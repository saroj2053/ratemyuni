import React, { useEffect, useState } from "react";
import AppLayout from "../components/user/AppLayout";
import { useLocation } from "react-router-dom";
import useGeocodeAddress from "../hooks/useGeocodeAddress";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useUserContext from "../context/UserContext";
import Modal from "../components/Modal";
import useCreateReview from "../hooks/useCreateReview";
import Review from "../components/Review";

const UniversityDetails = () => {
  const location = useLocation();
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
  });
  const [isLocationDataValid, setIsLocationDataValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { university } = location.state || {};
  const logoUri = `http://localhost:8000/static/logos/${university.logo}`;

  const { loading, geocodeAddress } = useGeocodeAddress();
  const { createReview } = useCreateReview();
  const address_geocode = `${university.name}, ${university.location}`;

  const { user } = useUserContext();

  const [inputs, setInputs] = useState({
    user: user?._id,
    university: university._id,
    rating: 1,
    review: "",
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddReview = async (evt) => {
    evt.preventDefault();
    await createReview(inputs);
    setInputs({
      user: user._id,
      university: university._id,
      rating: 1,
      review: "",
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchLocationData() {
      try {
        const response = await geocodeAddress(address_geocode);
        const { latitude, longitude } = response;
        setLocationData({ latitude: latitude, longitude: longitude });
        setIsLocationDataValid(true);
      } catch (error) {
        setIsLocationDataValid(false);
        console.error("Error geocoding address:", error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocationData();
  }, [university.location]);

  const averageRating =
    university.reviews?.reduce((sum, review) => sum + review.rating, 0) /
    university.reviews?.length;
  return (
    <AppLayout>
      <div
        key={university._id}
        className={`w-[90%] mx-auto my-6 ${
          isModalOpen && "bg-slate-400 bg-opacity-5"
        }`}
      >
        <div>
          <img
            className="{university.name === 'Gandaki University' || university.name === 'Pokhara University' ?w-full : w-24} h-24"
            src={logoUri}
            alt="uni logo"
          />
        </div>
        <h2 className="text-3xl font-bold text-slate-700 my-4">
          {university.name}
        </h2>
        <div className="w-full my-6 text-justify text-slate-600">
          {university.description}
        </div>
        <div className="flex justify-between flex-wrap items-center py-4 w-full">
          <div className="w-[100%] xl:w-[40%]">
            <div className="w-full flex justify-between items-center">
              <div className="text-lg text-slate-600 font-semibold my-4">
                Year of Establishment:
              </div>
              <h2 className=" bg-slate-600 text-white text-base px-4  rounded-full">
                {university.establishedYear}
              </h2>
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="text-lg text-slate-600 font-semibold my-4">
                Location:
              </div>
              <h2 className=" bg-slate-600 text-white text-base px-4  rounded-full">
                {university.location}
              </h2>
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="text-lg text-slate-600 font-semibold my-4">
                Category:
              </div>
              <h2 className=" bg-slate-600 text-white text-base px-4  rounded-full">
                {university.category}
              </h2>
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="text-lg text-slate-600 font-semibold my-4">
                Website Url:
              </div>
              <div>
                <a
                  href={`http://${university.websiteUrl}`}
                  target="_blank"
                  className=" text-blue-500 text-base px-4 py-2 underline "
                >
                  {university.websiteUrl}
                </a>
              </div>
            </div>
          </div>
          <div className="w-[100%] xl:w-[50%] rounded-lg">
            {!isLoading && isLocationDataValid ? (
              <div className="rounded-xl">
                <MapContainer
                  center={[locationData.latitude, locationData.longitude]}
                  zoom={15}
                  scrollWheelZoom={true}
                  className="h-[400px] rounded-xl z-10"
                  style={{ borderRadius: "10px" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[locationData.latitude, locationData.longitude]}
                  >
                    <Popup>
                      {university.name} <br /> {university.location}.
                    </Popup>
                  </Marker>
                </MapContainer>
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
        <h2 className="text-4xl font-bold text-slate-600 py-8"> Reviews_</h2>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-slate-600 text-base">Total Reviews</h2>
            <p className="text-4xl text-slate-600 font-bold py-4">
              {university.reviews?.length}
            </p>
          </div>
          <div>
            <h2 className="text-slate-600 text-base">Average Rating</h2>

            {university.reviews?.length > 0 ? (
              <p className="text-4xl text-slate-600 font-bold py-4">
                {averageRating} &#9733;
              </p>
            ) : (
              <p className="text-4xl text-slate-600 font-bold py-4">0.0</p>
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
        {university.reviews.length > 0 ? (
          <div>
            {university.reviews.map((review, reviewIdx) => (
              <div key={reviewIdx}>
                <Review review={review} />
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
          </Modal>
        )}
      </div>
    </AppLayout>
  );
};

export default UniversityDetails;
