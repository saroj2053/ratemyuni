import { useState } from "react";
import { toast } from "react-toastify";

const useGeocodeAddress = () => {
  // don't put async here in the useGeocodeAddress
  const [loading, setLoading] = useState(false);

  const geocodeAddress = async (address) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch geocode data");
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error("No results found for the address");
      }
      const { lat, lon } = data[0];
      return { latitude: lat, longitude: lon };
    } catch (error) {
      console.error("Error geocoding address:", error.message);
      toast.error("Error geocoding address");
    } finally {
      setLoading(false);
    }
  };

  return { loading, geocodeAddress };
};

export default useGeocodeAddress;
