import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchor, faBinoculars, faBullseye, faQuoteLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import logoImg from '../../assets/logo.png';
import heroesImg from '../../assets/heroes.png';
import taxesImg from '../../assets/taxes.png';
import carityImg from '../../assets/carity.png';
import donateImg from '../../assets/donate.png';
import contactImg from '../../assets/contact.png';

import './styles.css';

function Home(){
    return (
        <>
            <section className="home-container">
                <nav>
                    <img src={logoImg} alt="Be Hope" id="logo-header"/>
                    <Link className="button" to="/logon" >
                        Entrar
                    </Link>
                </nav>
                <article>
                    <img src={heroesImg} alt="Heroes"/>
                    <div>
                        <h1>
                            Cadastre-se gratuitamente!
                        </h1>
                        <Link className="button" to="/register" >
                            Cadastrar
                        </Link>
                        <p>
                            Crie sua conta em nossa plataforma, cadastre seus casos e ajude pessoas a encontrarem a sua ONG.
                        </p>
                    </div>
                </article>
            </section>
            <section className="home-container">
                <article>
                    <div>
                        <h2>Seja um doador!</h2>
                        <p>
                            Encontre uma causa em sua região, ajude-nos e faça parte de nossa corrente.
                            <br /> 
                            <Link className="button" to="/incidents" >
                                Seja um doador
                            </Link>
                        </p>
                    </div>
                    <div>
                        <img src={donateImg} alt="Doar"/>
                    </div>
                </article>
                <article>
                    <div>
                        <img src={taxesImg} alt="Sem taxas"/>
                    </div>
                    <div>
                        <h2>Sem custos e livre de taxas</h2>
                        <p>
                            Nossa platafoama atua como um mediador entre ONGs e os doadores. As doações são feitas diretamente para as organizações. Não cobramos nenhuma taxa sobre as transações! A plataforma Be Hope sempre será inteiramente gratuita.    
                        </p>
                    </div>
                </article>
            </section>
            <section className="home-container">
                <h1>
                    Quem somos?
                </h1>
                <article>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum lorem sit amet massa egestas, in pulvinar lacus scelerisque. Vivamus pretium augue ac dolor pellentesque, vitae ullamcorper erat suscipit. Curabitur quis ante id ex volutpat tempus nec in ante. Maecenas ac lobortis elit, eu eleifend erat.
                    </p>
                    <div>
                        <img src={carityImg} alt="Caridade"/>
                    </div>
                </article>
                <article>
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faBullseye} />
                        </span>
                        <h2>
                            Missão
                        </h2>
                        <p>
                            Dar maior visibilidade e ajudar pessoas e organizações que atuam na sociedade em prol de diversas causas políticas.
                        </p>
                    </div>
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faAnchor} />
                        </span>
                        <h2>
                            Valores
                        </h2>
                        <div>
                            <p className="quote">
                                <span className="quote-icon">
                                    <FontAwesomeIcon icon={faQuoteLeft} />
                                </span>
                                Não espere por grandes líderes; faça você mesmo, pessoa a pessoa.
                                <br/> <strong>Madre Teresa de Calcutá</strong>
                            </p>
                        </div>
                    </div>
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faBinoculars} />
                        </span>
                        <h2>
                            Visão
                        </h2>
                        <p>
                            Nosso objetivo é contribuir com entidades sem fins lucrativos a expandirem suas atividades por meio da divulgação de seu trabalho no meio onde atuam.
                        </p>
                    </div>
                </article>
            </section>
            <section className="home-container">
                <article>
                    <h1>
                        Duvidas, Críticas ou Sugestões?
                    </h1>
                    <p>
                        Fale conosco! Envie-nos suas dúvidas, críticas, sugestões ou elogios e contribua para tornar nossa plataforma cada vez melhor.
                    </p>
                    <img src={contactImg} alt="Fale conosco"/>
                </article>
                <form >
                   <select>
                       <option value="Crítica">Crítica</option>
                       <option value="Dúvida">Dúvida</option>
                       <option value="Elogio">Elogio</option>
                       <option value="Reclamação">Reclamação</option>
                       <option value="Sugestão">Sugestão</option>
                   </select>
                   <input 
                        
                        type="text" 
                        placeholder="Nome completo"
                    />
                   <input
                        type="email" 
                        placeholder="E-mail"
                    />
                   <input
                        type="text" 
                        placeholder="WhatsApp"
                    />
                   <div className="input-group">
                       <input
                            type="text" 
                            placeholder="Cidade"
                        />
                       <input
                            type="text" 
                            placeholder="UF" 
                            style={{ width: 80 }}
                        />
                   </div>
                   <textarea 
                        placeholder="Escrever mensagem" />
                   <button className="button" type="submit">
                        Enviar mensagem    &nbsp;
                        <FontAwesomeIcon icon={faEnvelope} />
                    </button>                
               </form>
            </section>
        </>
    );
}

export default Home;