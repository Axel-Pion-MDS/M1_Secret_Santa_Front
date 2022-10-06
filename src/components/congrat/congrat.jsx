import './congrat.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Congrat() {
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('register')){
            navigate('/');
        }
    }, []);

    return (
        <div className="content" id="congrat">
            <div className="container">
                <h1>Congratulations!<br />You have been successfully registered at Secret Santa.</h1>
                <p>Don't panic if you don't have your gifts yet. You will receive an email in a while. In this email you will find the person you have drawn on. You will then offer a gift to this person. In the meantime let's all enjoy the magic of Christmas ! Oh-oh-oh !</p>
                <img src={require('../../assets/images/gift.png')} alt="Gift" />
            </div>
        </div>
    );
}

export default Congrat;