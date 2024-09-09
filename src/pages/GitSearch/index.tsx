import { useState } from 'react';
import './styles.css';

import ResultCard from 'components/ResultCard';
import axios from 'axios';

type FormData = {
  use: string;
}

type UseGitHub = {
  login: string;
  url: string,
}

const GitSearch = () => {
  const [useGitHub, setUseGitHub] = useState<UseGitHub>()

  const [formData, setFormData] = useState<FormData>(
    {
      use: ''
    }
  )
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const use = event.target.name
    const value = event.target.value

    setFormData({ ...formData, [use]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${formData.use}`)
    .then((response) =>{
      setUseGitHub(response.data);
    })
    .catch((error) =>{
      setUseGitHub(undefined)
    });
  }

  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Busca GitHub</h1>
      <div className="container search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="use"
              value={formData.use}
              className="search-input"
              placeholder="usuario github (Seu Usuario)"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Buscar
            </button>
          </div>
        </form>
        {useGitHub &&
          <>
            <ResultCard title="Usuario" description={useGitHub.login} />
            <ResultCard title="Número de repositorios" description={useGitHub.url} />
          </>
        }
      </div>
    </div>
  );
};

export default GitSearch;
