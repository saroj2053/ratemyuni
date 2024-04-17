// Defining tailwind css classes for different range of ratings
export const getRatingColor = (rating) => {
  if (rating === 5) return "bg-green-700";
  if (rating >= 4 && rating < 5) return "bg-green-400";
  if (rating >= 3 && rating < 4) return "bg-yellow-300";
  if (rating >= 2 && rating < 3) return "bg-orange-300";
  return "bg-red-400";
};
