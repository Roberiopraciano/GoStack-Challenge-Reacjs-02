import React, { useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
 
  useEffect(() => {
    api.get('repositories').then(response => { setRepositories(response.data) })
  }, []);

  async function handleAddRepository() {
    const rand = Math.floor(Math.random() * 1000) + 3
    const response = await api.post('repositories', {
      id: `${rand}`,
      title: `Novo Projeto ${Date.now()}`,
      owner: "Roberio Praciano"
    });
    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    console.log(`Delete ${id}`)
    const response = await api.delete(`repositories/${id}` );
    const repositorieIndex = repositories.findIndex(repositories => repositories.id === id);
    const repositorienew = repositories;
    repositorienew.splice(repositorieIndex, 1);
    console.table(repositorienew);
    setRepositories([...repositorienew]);
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => <li key={repositorie.id}>{repositorie.title}
          <button onClick={() => handleRemoveRepository(repositorie.id)}>
                  Remover
               </button>   </li>
                  )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
