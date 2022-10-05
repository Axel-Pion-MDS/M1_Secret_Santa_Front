import './join.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formSlice } from '../../store/form';
import { Link, useNavigate } from 'react-router-dom';

import InputText from '../inputs/inputText/inputText';
import InputMail from '../inputs/inputMail/inputMail';
import Button from '../button/button';



function addZero(int){
    if(int<=9){
        return `0${int}`;
    }
    return `${int}`;
}

function Join() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const enddate = new Date(2022, 11, 24);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [promotion, setPromotion] = useState([]);

    

    useEffect(()=>{        
        const timer = setInterval(()=>{
            const today = new Date();
            const hours = parseInt(Math.ceil(Math.abs(today - enddate) / (1000 * 60 * 60)));
            const minutes = parseInt(Math.abs(enddate.getTime() - today.getTime()) / (1000 * 60) % 60);
            const seconds = parseInt(Math.abs(enddate.getTime() - today.getTime()) / (1000) % 60); 

            setHour(hours);
            setMinute(minutes);
            setSecond(seconds);
        }, 100);
        
        
    }, [hour, minute, second]);

    const addPromotion = ()=>{
        fetch("http://127.0.0.1:8000/promotions/", {
            method: 'GET',
            redirect: 'follow'
          })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    addPromotion();

    return (
        <div className="content" id="join">

            <div className="container">    
                <h1>Ho-ho-ho !<br/>Add your personal information</h1>   
                <p>No data will be used for commercial purposes</p>
                
                <div className="form" id="join-form">
                    <div className="row">
                        <div className="col">
                            <InputText
                                id="join-lastname"
                                minLength="3" 
                                maxLength="24"
                                label="Last name"
                                placeholder="Your last name"
                            />
                        </div>

                        <div className="col">
                            <InputText
                                id="join-firstname"
                                minLength="3" 
                                maxLength="24"
                                label="First name"
                                placeholder="Your first name"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <InputMail
                                id="join-firstname"
                                minLength="3" 
                                maxLength="64"
                                label="Email"
                                placeholder="exemple@email.com"
                            />
                        </div>

                        <div className="col">
                            <label className='inputs input-label'>
                                <div class="inputs-label">Promotion</div>
                                <select id="join-promotion">
                                    {promotion.map((p)=>
                                        <option value={p.id}>{p.label}</option>
                                    )}
                                </select>
                                <div class="inputs-error-text">none</div>
                            </label>                           
                        </div>
                    </div>        

                    <div className="join-timer">
                        The draw is in 
                        <div className="join-timer-time">
                            <b className="join-timer-hour">{ addZero(hour) }</b>:
                            <b className="join-timer-minute">{ addZero(minute) }</b>:
                            <b className="join-timer-second">{ addZero(second) }</b>
                        </div>
                    </div>
                    
                    <Button>Register me</Button>
                </div>                
            </div>

        </div>
    );
}

export default Join;