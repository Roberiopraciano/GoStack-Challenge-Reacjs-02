import React, { useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);
 
  useEffect(() => {
    api.get('/projects').then(response => { setProjects(response.data) })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Roberio Praciano"
    });
    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    console.log(`Delete ${id}`)
    const response = await api.delete(`projects/${id}` );
     
    const projectIndex = projects.findIndex(project => project.id === id);
    
    const projectsnew = projects;
    

    projectsnew.splice(projectIndex, 1);

    setProjects([...projectsnew]);
  };

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          <ul>
            {projects.map(project => <li key={project.id}>{project.title}
            
              <button onClick={() => handleRemoveRepository(project.id)}>
                Remover
             </button>
            
            </li>)}
          
            
          </ul>

         
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
