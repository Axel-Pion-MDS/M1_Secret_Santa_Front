import './home.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import InputText from '../inputs/inputText/inputText';
import Button from '../button/button';

function Home() {
    const dispatch = useDispatch();

    return (
        <div className="content" id="home">

            <div className="container">                
                <img src={require('../../assets/images/santa.png')} alt="Santa claus" />
                <h1>It's time for<br />Secret Santa!</h1>
                <p>Just join the school's biggest secret santa. Sign up and receive your gift.</p>
                <Button id="home-button">
                    Join Santa team
                </Button>               
            </div>

            {/* <InputText
                id="test"
                minLength="3" 
                maxLength="24"
                label="Name"
                placeholder="Your name"
            /> */}

        </div>
    );
}

export default Home;