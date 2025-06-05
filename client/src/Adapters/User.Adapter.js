import { useState } from "react";
import { API_BASE_URL } from "../constants";

export const useGetUser = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUser = async () => {
    try {
      setLoading(true);
      const url = `${API_BASE_URL}/api/test`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { getUser, userData, loading, error };
};
