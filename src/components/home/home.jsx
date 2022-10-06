import './home.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../button/button';

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="content" id="home">

            <div className="container">                
                <img src={require('../../assets/images/santa.png')} alt="Santa claus" />
                <h1>It's time for<br />Secret Santa!</h1>
                <p>Just join the school's biggest secret santa. Sign up and receive your gift.</p>
                <Button id="home-button" onClick={(e)=>{ navigate('/join/') }}>
                    Join Santa team
                </Button>               
            </div>
            
        </div>
    );
}

export default Home;