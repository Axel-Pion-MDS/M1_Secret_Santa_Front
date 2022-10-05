import './button.css';
import React, { useState } from 'react';

function Button(props){
    return (
        <div id={props.id} className="button" onClick={(e)=>{
            props.onClick(e);
        }}>
            {props.children}
        </div>
    );
}

export default Button;