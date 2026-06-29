import React, { useEffect, useState } from "react";
import AppLayout from "../components/user/AppLayout";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useUserContext from "../context/UserContext";
import Modal from "../components/Modal";
import useCreateReview from "../hooks/useCreateReview";
import Review from "../components/Review";
import { calculateAverageRating } from "../utils/calculateAverageRating";
import { useLocation } from "react-router-dom";
import useGetUniversityDetails from "../hooks/useGetUniversityDetails";
import Loader from "../components/Loader";
import { getRatingColor } from "../utils/ratingBgColor";
import { FaStar } from "react-icons/fa";

const UniversityDetails = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [university, setUniversity] = useState(null);
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
  });
  const [mapLoading, setMapLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  const { loading, getUniversityDetails } = useGetUniversityDetails();

  useEffect(() => {
    async function fetchUniversityDetails() {
      const responseData = await getUniversityDetails(id);
      if (!responseData) return;
      setUniversity(responseData.university);
      if (responseData.geocode) {
        setLocationData({
          latitude: responseData.geocode.latitude,
          longitude: responseData.geocode.longitude,
        });
        setGeocodeError(false);
      } else {
        setGeocodeError(true);
      }
      setMapLoading(false);
    }
    fetchUniversityDetails();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const { createReview } = useCreateReview();
  const { user } = useUserContext();

  const [inputs, setInputs] = useState({
    user: user?._id,
    university: id,
    rating: 1,
    review: "",
  });

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingReview(null);
    setInputs({
      user: user?._id,
      university: id,
      rating: 1,
      review: "",
    });
  };

  const handleAddReview = async (evt) => {
    evt.preventDefault();
    await createReview(inputs);
    setInputs({
      user: user._id,
      university: id,
      rating: 1,
      review: "",
    });
    setIsModalOpen(false);
  };

  const handleEditReview = async (evt) => {
    evt.preventDefault();
    try {
      const response = await fetch(`/api/review/${editingReview._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: inputs.rating, review: inputs.review }),
      });
      const data = await response.json();
      if (data.success) {
        setUniversity((prev) => ({
          ...prev,
          reviews: prev.reviews.map((r) =>
            r._id === editingReview._id ? { ...r, rating: inputs.rating, review: inputs.review } : r
          ),
        }));
        handleModalClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const response = await fetch(`/api/review/${reviewId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setUniversity((prev) => ({
          ...prev,
          reviews: prev.reviews.filter((r) => r._id !== reviewId),
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (review) => {
    setEditingReview(review);
    setInputs({
      user: user?._id,
      university: id,
      rating: review.rating,
      review: review.review,
    });
    setIsModalOpen(true);
  };

  if (loading || !university) {
    return (
      <AppLayout>
        <Loader title="University Details" />
      </AppLayout>
    );
  }

  const averageRating = calculateAverageRating(university?.reviews);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-48 h-48 bg-gray-50 rounded-xl flex items-center justify-center p-4">
              <img
                className="max-w-full max-h-full object-contain"
                src={`/static/logos/${university.logo}`}
                alt={university.name}
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {university.name}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              {university.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500">Established</span>
                <span className="font-medium text-gray-800">
                  {university.establishedYear}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500">Location</span>
                <span className="font-medium text-gray-800">
                  {university.location}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500">Category</span>
                <span className="font-medium text-gray-800">
                  {university.category}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500">Website</span>
                <a
                  href={`http://${university.websiteUrl}`}
                  target="_blank"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {university.websiteUrl}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="h-[300px] rounded-xl overflow-hidden border border-gray-200 relative z-0">
            {!mapLoading && !geocodeError && locationData.latitude ? (
              <MapContainer
                center={[locationData.latitude, locationData.longitude]}
                zoom={15}
                scrollWheelZoom={true}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[locationData.latitude, locationData.longitude]}
                >
                  <Popup>
                    {university.name}
                    <br />
                    {university.location}
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-100 text-sm text-gray-400">
                {geocodeError
                  ? "Map location unavailable"
                  : "Loading map..."}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-center gap-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Reviews</p>
                <p className="text-4xl font-bold text-gray-800">
                  {university.reviews?.length || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Rating</p>
                <p className="text-4xl font-bold text-gray-800">
                  {averageRating !== "N/A" ? averageRating : "0.0"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              {[
                { label: "Excellent", range: 5 },
                { label: "Good", range: 4 },
                { label: "Average", range: 3 },
                { label: "Below Avg", range: 2 },
                { label: "Poor", range: 1 },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium ${getRatingColor(item.range)}`}
                >
                  <span>{item.range}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
            {user && (
              <button
                onClick={handleModalOpen}
                className="text-sm font-medium text-white bg-gray-800 px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Write Review
              </button>
            )}
          </div>

          {university.reviews?.length > 0 ? (
            <div>
              {university.reviews.map((review, idx) => (
                <Review
                  key={idx}
                  review={review}
                  currentUser={user}
                  onEdit={openEditModal}
                  onDelete={handleDeleteReview}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <p className="text-gray-400 text-sm">
                No reviews yet. Be the first to review!
              </p>
            </div>
          )}
        </div>

        {isModalOpen && (
          <Modal onClose={handleModalClose}>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editingReview ? "Edit Review" : "Write a Review"}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setInputs({ ...inputs, rating: star })
                      }
                      className={`text-2xl transition-colors ${
                        inputs.rating >= star
                          ? "text-yellow-400"
                          : "text-gray-300 hover:text-yellow-200"
                      }`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review
                </label>
                <textarea
                  rows={5}
                  value={inputs.review}
                  onChange={(evt) =>
                    setInputs({ ...inputs, review: evt.target.value })
                  }
                  placeholder="Share your experience..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="text-sm font-medium text-gray-600 border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={editingReview ? handleEditReview : handleAddReview}
                  className="text-sm font-medium text-white bg-gray-800 px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {editingReview ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </AppLayout>
  );
};

export default UniversityDetails;
