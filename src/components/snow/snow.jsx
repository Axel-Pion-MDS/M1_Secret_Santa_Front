import Snoww from './snoww.js';
import './snow.css';

import React, { useState, useEffect } from 'react';

function Snow(props){

    useEffect(()=>{
        console.log(props.id)
        const snoww = new Snoww({
            id: props.id,
            theme: 'pastel',
            min_size: 1,
            max_size: 3
        });
        snoww.start();
    }, []);
    

    return(
        <div id={props.id} className="snow"></div>
    )
}

export default Snow