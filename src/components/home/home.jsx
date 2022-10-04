import './home.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const dispatch = useDispatch();

    return (
        <div className="content" id="Home">
            Home
        </div>
    );
}

export default Home;