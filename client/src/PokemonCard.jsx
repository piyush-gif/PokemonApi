const PokemonCard = ({pokemon}) => {
  return ( 
    <div className="pokedex-card">
      <div className="card-header">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <span className="pokemon-id">#{pokemon.id}</span>
      </div>
      
      <div className="card-image">
        <img src={pokemon.sprite} alt={pokemon.name} />
      </div>
      
      <div className="card-info">
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <span key={index} className="type-badge">{type}</span>
          ))}
        </div>
        
        <p className="pokemon-height">Height: {pokemon.height / 10} m</p>
        <p className="pokemon-weight">Weight: {pokemon.weight / 10} kg</p>
        <p className="pokemon-experience">Base Experience: {pokemon.base_experience}</p>
      </div>
    </div>
  );
}
 
export default PokemonCard;