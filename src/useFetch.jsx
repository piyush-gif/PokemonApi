import { useState } from "react";

const useFetch =() =>{
    const [name, setName] = useState('bulbasaur');
    const [pokeData, setPokeData] = useState(null);
    const [error, setError] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
  const handleClick = () =>{
    const trimmedName = name.trim().toLowerCase();

    if (trimmedName === "") {
      setError("Please enter a valid Pokémon name.");
      setPokeData(null);
      return;
    }
    setError(null);
    setPokeData(null);
    setShowDetails(false);
    fetch(`https://pokeapi.co/api/v2/pokemon/${trimmedName}`,{
    }).then((res) => {
      if(!res.ok){
        throw Error ('Could not fetch the data from that resource, Enter a valid Pokemon name');
      }
      return res.json()
    }).then((data) => {
      setPokeData(data);
      console.log("Pokemon data:", data);
      console.log("Types:", data.types.map(t => t.type.name));
    })
    .catch((err)=>{
      setError(err.message);
    })

   
  }
   return {name, setName, pokeData, error, showDetails, setShowDetails, handleClick}
}
    

export default useFetch;