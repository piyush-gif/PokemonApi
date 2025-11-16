import { useState } from "react";
import useFetch from "./useFetch";

const Home = () => {
  const [name, setName] = useState("");
	// const {data, loading, error} = useFetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

	const handleClick = (na) => {
		setName('bulbasaur');
	}
   return(
    <div>
      <div>
        <h1>Welcome to Pokemon World!</h1>
        <p>Enter the pokemon name</p>
        <input type ="text" value = {name} onChange={e => setName(e.target.value)}/>
        <button onClick={handleClick()}></button>
      </div>
    </div>  
   )
}
 
export default Home;