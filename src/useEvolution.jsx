import { useState } from "react";

const useEvolution= () => {
    const [evolve, setEvolve]=useState(null);
    const [evoError, setEvoError] = useState(null);


    const fetchEvo = (name) => {
      const trimmedName = name.trim().toLowerCase();

      if (trimmedName === "") {
        setEvoError("Enter a valid Pokémon name.");
        return;
      }

      setEvoError(null);
      setEvolve(null);

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${trimmedName}`)
      .then((res)=> {
        if(!res.ok){
          throw Error ("There's no further evolution for this pokemon");
        }
        return res.json();
        }).then((data) => {
          const speciesUrl= data.evolution_chain.url;
          
          return fetch(speciesUrl)
        }).then((res) => {
          return res.json();
        })
        .then((data) => {
          setEvolve(data);
        })
        .catch((err) => {
          setEvoError(err.message);
        })
    

    }
    return {
      evolve, evoError, fetchEvo
      }
  }

export default useEvolution;