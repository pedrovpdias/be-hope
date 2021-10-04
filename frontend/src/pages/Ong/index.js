import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faChevronLeft, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import InputMask from 'react-input-mask';

import api from '../../services/api';

import logoImg from '../../assets/logo.png'

import './styles.css';

function Ong(){
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const ongProfile = "ong-profile/"+ongId;

    const [name, setName ] = useState('');
    const [email, setEmail ] = useState('');
    const [whatsapp, setWhatsapp ] = useState('');
    const [city, setCity ] = useState('');
    const [uf, setUf ] = useState('');
    const [states, setStates ] = useState([]); 
    const [cities, setCities ] = useState([]);  
    const [oldPassword, setOldPassword ] = useState(''); 
    const [password, setPassword ] = useState(''); 
    const [confirm, setConfirm ] = useState(''); 

    useEffect(() => {
        api.get(ongProfile).then(response => {
            setName(response.data[0].name);
            setEmail(response.data[0].email);
            setWhatsapp(response.data[0].whatsapp);
            setCity(response.data[0].city);
            setUf(response.data[0].state_id);
            setOldPassword(response.data[0].password);
        });
    }, [ongProfile]);
    
    function handleUpdate(e){
        e.preventDefault();

        if(password === confirm){  
            let data = {}
            
            if(password === '' || !password) {
                data = {
                    id: ongId,
                    name,
                    email,
                    whatsapp,
                    city,
                    password: oldPassword,
                };
            }
            else {
                data = {
                    id: ongId,
                    name,
                    email,
                    whatsapp,
                    city,
                    password,
                };
            }

            try {
                api.put('ong-profile', data);
                alert(`Dados atualizados com sucesso`);
                history.push('/profile');
            } catch(err) {
                alert('Erro na alteração, tente novamente.');
            }
        }
        else {
            document.getElementById('checkPassword').style.display = 'block'
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/logon');
    }

    useEffect(() => {
        api.get('/states').then(response => {
            setStates(response.data);
        });
    }, []);

    useEffect(() => {
        api.get('/cities/'+uf ).then(response => {
            setCities(response.data);
        });
    }, [uf]);

    return (
        <div className="ong-profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" id="logo-header"/>
                <span>Bem vinda, &nbsp;
                    {ongName}
                </span>

                <Link className="button btn-home" to="/profile" >
                    <FontAwesomeIcon icon={faChevronLeft} color="#ffffff" />
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faPowerOff} color="#55B83E" />
                </button>
            </header>
            <div className="data-container">
                <form onSubmit={handleUpdate}>
                    <h1>Dados cadastrados</h1>
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
                        <select 
                            onChange={e => setUf(e.target.value)} 
                            style={{width: 100}}
                            value={uf} 
                        >
                            {states.map(stateArray => (
                                <option 
                                    key={stateArray.id} 
                                    value={stateArray.id}
                                >
                                    {stateArray.uf}
                                </option>
                            ))}
                        </select>

                        <select 
                            onChange={e => setCity(e.target.value)}
                            value={city} 
                        >
                            {cities.map(arrayCity => (
                                <option 
                                    key={arrayCity.id} 
                                    value={arrayCity.id}
                                >
                                    {arrayCity.city}
                                </option>
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
                    <p className="input-group">
                        <Link className="button" id="cancel-button" to='/profile'>
                            <FontAwesomeIcon icon={faTimes} color="#ffffff" />
                        </Link>
                        <button className="button" type="submit" id="btn">
                            <FontAwesomeIcon icon={faSave} color="#ffffff" />&nbsp;
                            Salvar Alterações
                        </button>   
                    </p>                
               </form>
            </div>
        </div>
    );
}

export default Ong;