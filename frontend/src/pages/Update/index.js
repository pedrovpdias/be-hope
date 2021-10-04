import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Switch from 'react-input-switch';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import './styles.css';

function Update(){
    const history = useHistory();
    
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState('');
    const [ collected, setCollected ] = useState('');
    const [ priority, setPriority ] = useState(0);

    const { id } = useParams();

    useEffect(() => {
        api.get(`/incident/detail/${id}`).then(response => {
            setTitle(response.data.title);
            setDescription(response.data.description);
            setValue(response.data.value);
            setCollected(response.data.collected);
            setPriority(response.data.priority)
        })
    }, [id]);

    function handleUpdateIncident(e){
        e.preventDefault();
        const data = {
            id,
            title,
            description,
            value,
            collected,
            priority,
        };

        try {
            api.put('incidents', data);            
            alert('Caso atualizado com sucesso!');
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar o caso! Tente novamente')
        }
    }

    return (
        <>
        <header className="update-header">
            <nav>
                <img src={logoImg} alt="Be Hope" id="logo-header"/>
                <Link className="button btn-home" to="/profile" title="Voltar" alt="Voltar" >
                    <FontAwesomeIcon icon={faChevronLeft} color="#ffffff" />
                </Link>
            </nav>
        </header>
        <section className="update-container">
            <form onSubmit={handleUpdateIncident}>
                <h1>
                    Atualizar caso
                </h1>
                
                <strong>Título do caso:</strong>
                <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    placeholder="Título do caso"
                    maxLength="45"
                />

                <strong>Descrição:</strong>
                <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Descrição" 
                />

                <strong>Valor:</strong>
                <input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Valor (R$)"
                    type="number"
                />

                <strong>Total arrecadado:</strong>
                <input
                    value={collected}
                    onChange={e => setCollected(e.target.value)}
                    placeholder="Valor (R$)"
                    type="number"
                />
                    
                <p className="toggle">
                    <Switch 
                        value={priority} 
                        onChange={setPriority} 
                        styles={{
                            trackChecked: {
                                backgroundColor: '#55B83E'
                            },
                        }}
                    />
                    <label className="urgent">
                        Urgência
                    </label>
                </p>
                    
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

        </section>
        </>
    );
}

export default Update;