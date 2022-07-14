import { useState } from "react";
import axios from "axios";
import './App.css';
import { SiPokemon } from 'react-icons/si';
import { ImSearch } from 'react-icons/im';

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    type: "",
    id: ""
  });

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
      setPokemon({
        name: pokemonName,
        type: response.data.types[0].type.name,
        id: response.data.id
      });
      setPokemonChosen(true);
    }
    );
  }

  return (
    <div className="app">

      <div className="navBar">
        <div className="title">
          <SiPokemon className="titleName" />
          <h1>Pokedex</h1>
        </div>
        <div>
          <input type="text" onChange={(event) => { setPokemonName(event.target.value); }} />
          <button onClick={searchPokemon}><ImSearch /></button>
        </div>
      </div>

      <div className="Display">
        {!pokemonChosen ? (
          <h1 className="displayTitle">Please Choose a Pokemon</h1>
        ) : (
          <div className="Card">
            <h1 className="cardId">{pokemon.id}</h1>
            <h1 className="cardName">{pokemon.name}</h1>
            <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} className="cardImage" alt="Pokemon_Image" />
            <h1 className="cardType">Type:{pokemon.type}</h1>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;