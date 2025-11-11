import { useState } from "react";

const Home = () => {
  const [name, setName] = useState("");
   return(
    <div>
      <div>
        <h1>Welcome to Pokemon World!</h1>
        <p>Enter the pokemon name</p>
        <input type ="text" value = {name} onChange={e => setName(e.target.value)}/>
      </div>
    </div>  
   )
}
 
export default Home;