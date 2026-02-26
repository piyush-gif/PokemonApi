import { useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (url, options = {}) => {
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

  const postData = async (url, options = {}) => {
    try {
      setError("");
      setLoading(true);
      const response = await fetch(url, {
        ...options,
      });
      if (!response.ok) throw new Error("Couldn't connect with the server");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (url, options = {}) => {
    try {
      setError("");
      setLoading(true);
      const response = await fetch(url, {
        ...options,
      });
      if (!response.ok) throw new Error("Couldn't connect with the server");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (url, id) => {
    try {
      setError("");
      setLoading(true);
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Couldn't connect with the server");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData, postData, updateData, deleteData };
};

export default useFetch;
