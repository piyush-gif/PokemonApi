import { useState } from "react";

const useRequest = () => {
  const [reLoading, setLoading] = useState(false);
  const [reError, setError] = useState(false);

  const send = async (url, options = {}) => {
    try{
      setLoading(true);
      setError(false);
      const response = await fetch(url, options);

      if(!response.ok) throw Error("Request Failed!");
      const data = await response.json();
      return data;
    }
    catch(err){
      setError(true);
      console.error(`Use request error : ${err}`);
    }
    finally{
      setLoading(false);
    }
  }
  return {send, reLoading, reError};
}
 
export default useRequest;