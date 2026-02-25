import { useState, useEffect } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (url) => {
    try {
      setError("");
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok)
        throw new Error("Couldn't get a response from the server");
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
