import { useEffect, useState } from 'react';
import useFetch from './useFetch';
const PokeDex = () => {

  const {data, loading, error}  = useFetch('http://localhost:3000/pokemons');
  return (
    <div>
      <div>
        <p>hello this is the PokeDex</p>
        <input/>
        {loading && <p> Loading ...</p>}
        {error && <p> error found!</p>}
        {data && data.map((data) => (<div key = {data.id}>
          <p>{data.name}</p>
          <img src={data.img} alt={data.name}></img>
          </div>
        ))}
      </div>
    </div>
  )
};

export default PokeDex;
