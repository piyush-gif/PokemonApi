import { useState } from "react";

const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = async (url, options = {}) => {
    try{
      setLoading(true);
      const response = await fetch(url, options);
      if(!response.ok) throw Error("Request Failed!");
      return await response.json();
    }
    catch(err){
      console.error(`There's an error : ${err}`);
      setError(err);
    }
    finally{
      setLoading(false);
    }
  }
  return {send, loading, error};
}
 
export default useRequest;