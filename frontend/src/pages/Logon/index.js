import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';
import herosImg from '../../assets/heroes.png'; 

function Logon(){
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  if(localStorage.getItem('ongId')) history.push('/profile')

  const data = {
    id,
    password,
  }

  async function handleLogin(e){
    e.preventDefault();

    try {
      const response = await api.post('sessions', data);
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      alert('Falha no login! Tente novamente');
    }
  }
  return(
    <>
      <div className="logon-container">
        <section className="form">
          <img src={logoImg} alt="Be The Hero" id="logo"/>  
            <form onSubmit={handleLogin}>
              <h1>Faça seu logon</h1>

              <input
                value={id}
                onChange={e => setId(e.target.value)}
                placeholder="Sua ID"
              />

              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Senha"
                type="password"
              />
              <button type="submit" className="button">Entrar</button>  
              <div className="links">
                <Link to="/" className="main-link">
                  <FontAwesomeIcon icon={faLongArrowAltLeft} color="#55B83E" />
                  Voltar
                </Link>
                
                <Link to="/register" className="main-link">
                  Não tenho cadastro
                </Link>
              </div>
            </form>          
        </section>
        <img src={herosImg} alt="Heroes" />
      </div> 
    </>
    );
}

export default Logon;