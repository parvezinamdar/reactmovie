import React from 'react';
import './HeroImage.css';
import ticket from '../../images/ticket.png';
import imdb from '../../images/imdb.png'
const HeroImage = (props) => {
    return (
        <div>

            <div className="heroimage"
            style={{
                background:
                `linear-gradient(to bottom, 
                rgba(0,0,0,0.2) 39%, 
                rgba(0,0,0,0.2) 41%, 
                rgba(0,0,0,0.65) 100%),
                url('${props.image}'),
                #1c1c1c`,
                boxShadow: `inset 0 -90px 40px -10px rgba(0,0,0,0.7)`   
                
            }}   
        >
            <div className="heroimage-content">
                <div className="heroimage-text">
                    <h1>{props.title}</h1>
                    <p>{props.text}</p>
                    <span><img src={ticket} alt="ticket"/> {props.date}</span>
                    <span><img src={imdb}  alt="imdb"/> {props.imdb}</span>
                </div>
            </div>
        </div>
        </div>
        
    )
}

export default HeroImage;