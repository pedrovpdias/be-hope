import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faExclamationTriangle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'rc-progress';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import './styles.css';

function Incidents(){    
    const [incidents, setIncidents] = useState([]);
    const [ userInfo, setUserInfo ] = useState(null);
    const [ userLocation, setUserLocation ] = useState('');
    
    function isUrgent() {
        return (
            <span 
                className="priority"
                title="Urgente"
                alt="Urgente"
            >
                <FontAwesomeIcon icon={faExclamationTriangle} color="#fa4a37" />
            </span>
        );
    }
        
    function getUserGeoLocation() {
        fetch("https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91")
            .then( response => response.json() )
            .then( data => setUserInfo( data) );
        }
    
    useEffect(()=>{
        getUserGeoLocation();
        if(userInfo) {
            setUserLocation(userInfo.city);
        }
    },[userInfo]);

    useEffect(() => {      
   
        if(userLocation) {            
            api.get('/incidents/'+userLocation).then(response => {
                setIncidents(response.data);
            })
        } else {
            return;
        }
    }, [userLocation]);

    return (
        <>
        <header className="incidents-header">
            <nav>
                <img src={logoImg} alt="Be Hope" id="logo-header"/>
                <div>
                    <button className="button location"  title="Localização" alt="Localização" >
                        <FontAwesomeIcon icon={faMapMarkerAlt} color="#aaaaaa" />
                        { userLocation ? userLocation: '' }
                    </button>
                    <Link className="button btn-home" to="/"  title="Home" alt="Home" >
                        <FontAwesomeIcon icon={faHome} color="#ffffff" />
                    </Link>
                </div>
            </nav>
        </header>
        <section className="incidents-container">
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        
                        {incident.priority ? isUrgent() : ''}
                        
                        <h2>{incident.title}</h2>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>ONG:</strong>
                        <p>{incident.name}</p>

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
                        <Link to={'/detail/'+ incident.id} className="button">
                            Mais informações
                        </Link>
                    </p>
                </li>
                ))}
            </ul>
        </section>
        </>
    );
}

export default Incidents;