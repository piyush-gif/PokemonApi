import { useState } from "react";

const useFetch =() =>{
    const [name, setName] = useState('bulbasaur'); // 
    const [pokeData, setPokeData] = useState(null);
    const [error, setError] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [evolve, setEvolve]=useState(null);
    const [evoError, setEvoError] = useState(null);
  const handleClick = () =>{
    const trimmedName = name.trim().toLowerCase();

    if (trimmedName === "") {
      setError("Please enter a valid Pokémon name.");
      setPokeData(null);
      return;
    }
    setEvoError(null);
    setEvolve(null);
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
      return fetch(`https://pokeapi.co/api/v2/pokemon-species/${trimmedName}`)
    })
    .then((res) => {
      if (!res.ok) throw Error("Could not fetch species data.");
      return res.json();
    })
    .then((speciesData) => {
      return fetch(speciesData.evolution_chain.url);
    })
    .then((res) => {
      if (!res.ok) throw Error("Could not fetch evolution chain.");
      return res.json();
    })
    .then((evolutionData) => {
      setEvolve(evolutionData);
    })
    .catch((err) => {
      setEvoError(err.message);
    });
};
   return {name, setName, pokeData, error, showDetails, setShowDetails, handleClick, evolve, evoError}
}
    

export default useFetch;