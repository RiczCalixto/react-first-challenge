import React, { useState, useEffect } from "react";
import api from "../src/services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((res) => setRepositories(res.data));
  }, []);

  async function handleAddRepository() {
    const newRepo = {
      title: "NOVO",
      url: "casa.com.br",
      techs: ["NODE", "react"],
    };
    const response = await api.post("/repositories", newRepo);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const newRepo = repositories.filter((repository) => repository.id !== id);
    setRepositories(newRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
