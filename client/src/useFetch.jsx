import { useEffect, useState } from "react";
// https://pokeapi.co/api/v2/pokemon/{id or name}/

// npx json-server --watch data/db.json
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try{
        if(!url) return; 
        
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if(!response.ok) throw Error("Request Failed!");
        const data = await response.json();
        setData(data);
      }
      catch(error){
        console.error(`There's an error ${error}.`);
        setError(error.message);
      }
      finally{
        setLoading(false);
      }
    }
    getData();
  },[url]);

  return { data, loading, error };
};

export default useFetch;