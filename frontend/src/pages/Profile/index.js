import React, { useState,  useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faTrash, faExclamationTriangle, faEdit, faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'rc-progress';

import api from '../../services/api';

import logoImg from '../../assets/logo.png'

import './styles.css';

function Profile(){
    const history = useHistory();
    
    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const ongProfile = "/ong/"+ongId;

    if(!ongId) history.push('/logon')
    
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            },
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId, incidents]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id ));
        } catch (error) {
            alert('Erro ao deletar caso!');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/logon');
    }

    function isUrgent() {
        return (
            <span 
                className="priority"
                title="Urgente"
            >
                <FontAwesomeIcon icon={faExclamationTriangle} color="#fa4a37" />
            </span>
        );
    }

    return(
        <div className="profile-container">
            <header>
                <div>
                    <img src={logoImg} alt="Be The Hero" id="logo-header"/>
                    <span>Bem vinda,&nbsp;
                        <Link className="profile-options" to={ongProfile} >
                            {ongName}
                            <FontAwesomeIcon icon={faEdit} />
                        </Link>
                    </span>
                </div>

                <div>
                    <Link className="button" to="/incident/new" >
                        <FontAwesomeIcon icon={faPlusCircle} color="#ffffff" /> &nbsp;
                        Novo caso
                    </Link>
                    <Link className="button btn-home" to="/" >
                        <FontAwesomeIcon icon={faHome} color="#ffffff" />
                    </Link>
                    <button type="button" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faPowerOff} color="#999999" />
                    </button>
                </div>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        
                        {incident.priority ? isUrgent() : ''}
                        
                        <h2>{incident.title}</h2>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>INCLUSÃO:</strong>
                        <p>{(incident.date.slice(0, 10)).split('-').reverse().join('/')}</p>

                        <strong>VALOR:</strong>
                        <p>
                            <span title="Valor arrecadado">
                                {
                                    Intl.NumberFormat('pt-BR', { 
                                        style: 'currency',
                                        currency: 'BRL' 
                                    }).format(incident.collected)
                                }
                            </span>
                            <span 
                                className="progress-bar" 
                                title={((incident.collected * 100) / incident.value )+ '%' } 
                            >
                                <Line 
                                    percent={(incident.collected * 100) / incident.value } 
                                    strokeWidth="7" 
                                    trailWidth="4"
                                    strokeColor="#55B83E"
                                    strokeLinecap="square"
                                />
                            </span>
                            <span title="Valor total">
                                {
                                    Intl.NumberFormat('pt-BR', { 
                                        style: 'currency',
                                        currency: 'BRL' 
                                    }).format(incident.value)
                                }
                            </span>
                        </p>

                        <p>
                            <Link to={"/update/"+incident.id} className="button">
                                <FontAwesomeIcon icon={faEdit} color="#ffffff" />&nbsp;
                                Atualizar
                            </Link>
                        </p>

                        <button
                            onClick={() => handleDeleteIncident(incident.id)} 
                            type="button"
                        >
                            <FontAwesomeIcon icon={faTrash} color="rgba(38, 32, 31, 0.8)" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Profile;