import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";
import "./css/style.css";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  const handleClick = (ev) => {
    if (ev.key === "Enter") {
      handleSearch();
    }
  };

  async function handleSearch() {
    if (!input) {
      alert("Erro! Preencha os campos para buscar um CEP.");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Erro ao buscar!");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="container-input">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(ev) => setInput(ev.target.value)}
          onKeyDown={handleClick}
        />
        <button type="submit" className="button-search" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.entries(cep).length > 0 && (
        <main className="main">
          <h2>{cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
