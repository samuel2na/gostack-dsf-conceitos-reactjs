import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      //getDados();
      api.get('repositories').then(response => {
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    // TODO

    const response = await api.post('repositories', {
      title: `Repositório 1`,
      url: 'https://github.com/samuel2na/portifolio',
      techs: ['Node.js','ReactJS']
    });

    const repo = response.data;
    setRepositories([...repositories, repo]);

    /*const res = await api.get('projects');
    var numero = (res.data.length == 0) ? 0 : res.data[res.data.length - 1].title.replace('Repositório ','');
 
    const response = await api.post('projects', {
      title: `Repositório ${parseInt(numero) + 1}`,
      owner: 'Samuel S. Almeida - via react'
    });

    const repo = response.data;
    setRepositories([...repositories, repo]);*/

  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter(
      repository => repository.id != id
    ));
    //  if(res.status == 204) {
    //    getDados();
    //  }
  }

  // function getDados(){
  //   api.get('projects').then(response => {
  //     setRepositories(response.data);
  //   });
  // }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(reposit => 
          <li key={reposit.id}>
            {reposit.title} 
            <button onClick={() => handleRemoveRepository(reposit.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
