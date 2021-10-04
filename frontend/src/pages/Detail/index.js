import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faExclamationTriangle, faEnvelope, faMapMarkerAlt, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Line } from 'rc-progress';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import './styles.css';

function Detail(){
    
    const [incident, setIncident] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        api.get(`/incident/detail/${id}`).then(response => {
            setIncident(response.data);
        })
    }, [id]);
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

    return (
        <>
        <header className="detail-header">
            <nav>
                <img src={logoImg} alt="Be Hope" id="logo-header"/>
                <Link className="button btn-home" to="/incidents" title="Voltar" alt="Voltar" >
                    <FontAwesomeIcon icon={faChevronLeft} color="#ffffff" />
                </Link>
            </nav>
        </header>
        <section className="detail-container">
            <ul>
                <li key={incident.id}>
                             
                    {incident.priority ? isUrgent() : ''}
                    
                    <h2>{incident.title}</h2>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>ONG:</strong>
                    <p>{incident.name}</p>   

                    <strong>INCLUSÃO:</strong>
                    <p>{incident.date ? (incident.date.slice(0, 10)).split('-').reverse().join('/') : '' }</p>

                    <strong>LOCALIZAÇÃO:</strong>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} />&nbsp; {incident.city} / {incident.uf}</p>                     

                    <strong>VALOR:</strong>
                    <p className="values">
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

                    <div className="contact-box">
                        <h3>
                            Entre em contato e faça sua contribuição:
                        </h3>
                        <p>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>
                                {incident.email}
                            </span>
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faWhatsapp} />
                            <span>
                                {incident.whatsapp}
                            </span>
                        </p>
                            
                    </div>
                    <p>
                        <Link className="main-link" to="/incidents">
                            <FontAwesomeIcon icon={faLongArrowAltLeft} color="#55B83E" />
                            Voltar
                        </Link>
                    </p>
                </li>
            </ul>
        </section>
        </>
    );
}

export default Detail;