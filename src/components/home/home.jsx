import './home.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import InputText from '../inputs/inputText/inputText';

function Home() {
    const dispatch = useDispatch();

    return (
        <div className="content" id="Home">

            <div className="spacer" style={{padding:'20px'}}></div>

            <InputText
                id="test"
                minLength="3" 
                maxLength="24"
                label="Name"
                placeholder="Your name"
            />

        </div>
    );
}

export default Home;