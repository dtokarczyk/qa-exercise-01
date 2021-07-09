import "./App.css";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  label {
    margin-right: 1rem;
  }
`;

const API_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [pokemon, setPokemon] = useState({
    name: "",
    weight: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [valueInput, setValueInput] = useState("");

  const handleChangeInput = (e) => {
    setValueInput(e.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setPokemon("");
    axios
      .get(`${API_ENDPOINT}${valueInput}`)
      .then(({ data }) => {
        const { name, weight } = data;

        setPokemon({
          name,
          weight,
        });
        setLoading(false);
      })
      .catch((e) => {
        setError(e.response.data);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Pokemon sercher</h1>
      <Form onSubmit={handleSearch}>
        <label>Name of pokemon</label>

        <input type="text" onChange={handleChangeInput} />
        <input type="submit" value="Znajdz" />
      </Form>

      {loading && <div>Ładuję...</div>}
      {pokemon.name && pokemon.weight && (
        <div>
          {pokemon.name}, {pokemon.weight}
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
}

export default App;
