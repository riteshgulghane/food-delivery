import { useState } from "react";
import { API_BASE_URL } from "../constants";

export const useGetRestaurant = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRestaurants = async () => {
    try {
      setLoading(true);
      const url = `${API_BASE_URL}/api/restaurant`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setRestaurantData(data);
      // return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { getRestaurants, restaurantData, loading, error };
};
