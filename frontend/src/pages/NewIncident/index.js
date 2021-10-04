import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-input-switch';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import './styles.css';

function NewIncident(){
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState('');
    const [ priority, setPriority ] = useState(0);

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,
            priority,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });
            
            alert('Caso cadastrado com sucesso!');
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar o caso! Tente novamente')
        }
    }
    
    return (
        <div className="new-incident-container">
           <div className="content">
               <section> 
                    <img src={logoImg} alt="Be The Hero" id="logo-header"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói para resolvê-lo.
                    </p>

                    <Link className="main-link" to="/profile">
                        <FontAwesomeIcon id="toggle" icon={faLongArrowAltLeft} color="#55B83E" />
                        Voltar
                    </Link>
               </section>
                <form onSubmit={handleNewIncident}>
                   <input 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        placeholder="Título do caso"
                        maxLength="45"
                    />
                   <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição" />
                   <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor (R$)"
                        type="number"
                    />
                    
                    <p className="toggle">
                        <Switch 
                            onClick={console.log(priority)}
                            on="1" 
                            off="0" 
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
                    
                   <button className="button" type="submit">Cadastrar</button>                
                </form>
           </div>
       </div> 
    );
}

export default NewIncident;