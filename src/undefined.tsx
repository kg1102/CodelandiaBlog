import React, { useState } from 'react';
import { api } from './config/api';
import { useEffect } from 'react';
import { SyncLoader } from 'react-spinners';

import './App.css';

function App() {
  const [nome, setNome] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function GetUsers(){
    await api.get('/api/get').then((response)=>{
      setNome(response.data);
    });
  }
  useEffect(()=>{
    GetUsers();   
    setTimeout(()=>{
      setLoading(!loading);
    }, 2500);
  }, []);

  return (
    <div className="App">
      {loading 
      ?
        <div className="loading">
          <SyncLoader loading={loading} color={'#42b5f4'} size={20}/>
          <h1>Carregando...</h1>
        </div>
      :
        <pre>
          {nome.map((val, key)=>{
            return (
              <>
                <h1>{val.nome}</h1>
              </>
            );
          })}
        </pre>
      }
    </div>
  );
}

export default App;
