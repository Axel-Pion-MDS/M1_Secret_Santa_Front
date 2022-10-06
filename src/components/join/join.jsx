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

    let dateLoaded = false;
    
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [promotion, setPromotion] = useState([]);
    const [santa, setSanta] = useState([]);
    const [drawtimer, setDrawTimer] = useState(undefined);
    const [error, setError] = useState('');

    useEffect(()=>{
        if(localStorage.getItem('register')){
            navigate('/congratulation/');
        }
    }, [])

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
            setSanta(response.data.data);
            const firstDate = new Date(response.data.data[0].draw_date);   
             
            const timer = setInterval(()=>{
                updateDrawDate(firstDate);   
            },100);
    
            setDrawTimer(timer);   
        })
        .catch(function (error) {
            console.log(error);
        });  
    }, []);

    const updateDrawDate = (enddate)=>{
        const today = new Date();
        const hours = parseInt(Math.ceil(Math.abs(today - enddate) / (1000 * 60 * 60)));
        const minutes = parseInt(Math.abs(enddate.getTime() - today.getTime()) / (1000 * 60) % 60);
        const seconds = parseInt(Math.abs(enddate.getTime() - today.getTime()) / (1000) % 60); 

        setHour(hours);
        setMinute(minutes);
        setSecond(seconds);
    }

    const changeDrawDate = (e)=>{
        const selector = document.getElementById('join-santa');
        const index = selector.selectedIndex;
        const selected = selector.childNodes.item(index);
        const draw_date = new Date(selected.dataset.draw);

        clearInterval(drawtimer);        

        const timer = setInterval(()=>{
            updateDrawDate(draw_date);
        },100);

        setDrawTimer(timer);              
    }; 

    const sendForm = (e)=>{
        const form = document.getElementById('join-form');
        const firstname = form.querySelector('#join-firstname input').value;
        const lastname = form.querySelector('#join-lastname input').value;
        const email = form.querySelector('#join-email input').value;
        const promo_id = form.querySelector('#join-promotion').value;
        const santa_id = form.querySelector('#join-santa').value;

        if(!firstname.length || !lastname.length || !email.length){
            setError('Please fill in all fields')
            return;
        }

        var data = JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            promo: promo_id,
            santa: santa_id,
        });
          
        var config = {
            method: 'post',
            url: `http://127.0.0.1:8000/users/add`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        
        axios(config)
        .then(function (response) {
            if(response.data.result != 'success'){
                setError(response.data.message);
            }else{
                localStorage.setItem('register', 'true');
                navigate('/congratulation/');
            }
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

                    <div className="row">
                        <div className="col full">
                            <label className='inputs input-label'>
                                <div class="inputs-label">Select your Secret Santa</div>
                                <select id="join-santa" onInput={(e)=>changeDrawDate(e)} on>
                                    {santa.map((p)=>
                                        <option key={p.id} value={p.id} data-draw={p.draw_date}>{p.label}</option>
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

                    <div className="join-form-error-text">
                        {error}
                    </div>
                </div>                
            </div>

        </div>
    );
}

export default Join;