import React, {useState,FormEvent} from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logImg from '../../assets/logo.svg'

import { Title, Form, Repositories } from './styles';

interface Repository {
  full_name:string;
  description: string;
  owner:{
    login: string;
    avatar_url: string;
  };

}

const Dashboard: React.FC = ()=>{

  const [newRepo,setNewRepo] = useState('murylocesar/Desafio-04-Fundamentos-node.js');

  const [repositories, setRepositories] = useState<Repository[]>([]);

   async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{
      event.preventDefault();

      const response = await api.get<Repository>(`/repos/${newRepo}`);
      const repository =response.data;
      setRepositories([...repositories, repository]);
      setNewRepo('');
    }

    return (
        <>
            <img src={logImg} alt="Github Explore"/>
            <Title>Explore repositórios no Github</Title>

            <Form onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange = { (e) => setNewRepo(e.target.value )}
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>
            <Repositories>
              {repositories.map(respository =>(
                <a key={respository.full_name}href="tes">
                  <img
                    src={respository.owner.avatar_url}
                    alt={respository.owner.login}
                  />
                  <div>
                    <strong>{respository.full_name}</strong>
                    <p>{respository.description}</p>
                  </div>
                  < FiChevronRight size={20} />
                </a>
              ))}


            </ Repositories>

        </>
    );
}

export default Dashboard;
