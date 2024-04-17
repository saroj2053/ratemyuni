export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return "N/A";
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = (totalRating / reviews.length).toFixed(2);
  return averageRating;
};
