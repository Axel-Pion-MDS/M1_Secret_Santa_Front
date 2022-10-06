import './popup.css';

import React, { useState, useEffect } from 'react';

function Popup(props){

    const [show, setShow] = useState(true);
    const displayTime = props.delay ? parseInt(props.delay) : 1000; 

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShow(false);
        },displayTime);
    }, []);

    return (
        <div id={props.id} className="popup" data-visible={show}>
            {props.children}
        </div>
    );
}

export default Popup;