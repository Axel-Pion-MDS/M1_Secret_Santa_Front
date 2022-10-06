import './join.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formSlice } from '../../store/form';
import { Link, useNavigate } from 'react-router-dom';

import InputText from '../inputs/inputText/inputText';
import InputMail from '../inputs/inputMail/inputMail';
import Button from '../button/button';

import axios from 'axios';

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
    const [santa, setSanta] = useState(0);
    
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

    useEffect(()=>{
        const config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/promotions/',
            headers: { 
            }
        };

        axios(config)
        .then(function (response) {
            setPromotion(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });  
    }, [promotion]);

    useEffect(()=>{
        const config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/santa/',
            headers: { 
            }
        };

        axios(config)
        .then(function (response) {
            setSanta(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });  
    }, [santa]);

    const sendForm = (e)=>{
        const form = document.getElementById('join-form');
        const firstname = form.querySelector('#join-firstname input').value;
        const lastname = form.querySelector('#join-lastname input').value;
        const email = form.querySelector('#join-email input').value;
        const promo = form.querySelector('#join-promotion').value;

        var data = JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            promo: promo,
        });
          
        var config = {
            method: 'post',
            url: `http://127.0.0.1:8000/santa/${santa}/add`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        
        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    return (
        <div className="content" id="join">

            <div className="container">    
                <h1>Ho-ho-ho !<br/>Add your personal information</h1>   
                <p>No data will be used for commercial purposes</p>
                
                <div className="form" id="join-form">
                    <div className="row">
                        <div className="col">
                            <InputText
                                id="join-firstname"
                                minLength="3" 
                                maxLength="24"
                                label="First name"
                                placeholder="Your first name"
                            />                            
                        </div>

                        <div className="col">
                            <InputText
                                id="join-lastname"
                                minLength="3" 
                                maxLength="24"
                                label="Last name"
                                placeholder="Your last name"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <InputMail
                                id="join-email"
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
                                        <option key={p.id} value={p.id}>{p.label}</option>
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
                    
                    <Button onClick={(e)=>sendForm(e)}>Register me</Button>
                </div>                
            </div>

        </div>
    );
}

export default Join;