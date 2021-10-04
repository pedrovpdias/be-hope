import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import './styles.css';
import { useEffect } from 'react';

function Register() {
    const [name, setName ] = useState('');
    const [email, setEmail ] = useState('');
    const [whatsapp, setWhatsapp ] = useState('');
    const [city, setCity ] = useState('1');
    const [uf, setUf ] = useState(''); 
    const [states, setStates ] = useState([]); 
    const [cities, setCities ] = useState([]);     
    const [password, setPassword ] = useState(''); 
    const [confirm, setConfirm ] = useState(''); 
    
    const history = useHistory();
    
    async function handleRegister(e){
        e.preventDefault();

        if(password === confirm){              
            const data = {
                name,
                email,
                whatsapp,
                city,
                password,
            };

            try {
                const response = await api.post('ongs', data);
                alert(`Seu ID de acesso: ${response.data.id}`);
                history.push('/logon')
            } catch(err) {
                alert('Erro no cadastro, tente novamente.');
            }
        } else {
            document.getElementById('checkPassword').style.display = 'block'
        }
    }

    useEffect(() => {
        api.get('/states').then(response => {
            setStates(response.data);
        });
    }, []);

    useEffect(() => {
        if(uf) {
            api.get('/cities/'+uf ).then(response => {
                setCities(response.data);
            });
        } else {
            api.get('/cities/1' ).then(response => {
                setCities(response.data);
            });
        }
    }, [uf]);
    
    return(
       <div className="register-container">
           <div className="content">
               <section>
                    <img src={logoImg} alt="Be Hope" id="logo"/>

                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.
                    </p>

                    <div className="links">
                        <Link to="/" className="main-link main-link-left">
                            <FontAwesomeIcon icon={faLongArrowAltLeft} color="#55B83E" />
                            Voltar para Home
                        </Link>
                        
                        <Link to="/logon" className="main-link main-link-right">
                            Logon
                            <FontAwesomeIcon icon={faSignInAlt} color="#55B83E" />
                        </Link>
                    </div>
               </section>
                <form onSubmit={handleRegister}>
                   <input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text" 
                        placeholder="Nome da ONG"
                    />
                   <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email" 
                        placeholder="E-mail"
                    />
                   <InputMask 
                        mask="+55 99 99999-9999" 
                        maskChar=" " 
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        type="text" 
                        placeholder="WhatsApp"
                    />

                   <div className="input-group">
                        <select onChange={e => setUf(e.target.value)} style={{width: 100}} >
                            {states.map(state => (
                                <option key={state.id} value={state.id} >{state.uf}</option>
                            ))}
                        </select>

                        <select onChange={e => setCity(e.target.value)}>
                            {cities.map(city => (
                                <option key={city.id} value={city.id}>{city.city}</option>
                            ))}
                        </select>
                   </div>
                   <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password" 
                        placeholder="Nova senha"
                    />
                    <input
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        type="password" 
                        placeholder="Confirmar Senha"
                        id="confirma"
                    />
                    <span id="checkPassword">As senhas não são equivalentes</span>
                   <button className="button" type="submit">Cadastrar</button>                
               </form>
           </div>
       </div> 
    );
}

export default Register;