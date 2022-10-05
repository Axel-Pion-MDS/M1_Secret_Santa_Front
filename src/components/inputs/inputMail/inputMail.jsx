import '../inputs.css';
import React, { useState } from 'react';

function emailIsValid(value){
    return String(value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function InputMail(props){
    const minLength = parseInt(props.minLength);
    const maxLength = parseInt(props.maxLength);

    const [value, setValue] = useState('');
    const [focus, setFocus] = useState(false);
    const [error, setError] = useState('none');

    const editInput = (e)=>{
        let inputValue = e.target.value;

        setError('none');

        if(minLength && inputValue.length < minLength){
            setError(`minimum ${minLength} characters`);
        }

        if(maxLength && inputValue.length > maxLength){
            inputValue = inputValue.slice(0, -1);
        }   

        if(!emailIsValid(inputValue)){
            setError('Email is not valid');
        }

        setValue(inputValue);
        e.target.value = inputValue;
    }   

    return ( 
        <label id={props.id} className="inputs input-mail" onFocus={()=>{ setFocus(true) }} onBlur={()=>{ setFocus(false); }} data-error={ error && !focus && error!=='none' ? 'true' : 'false' }>

            <div className="inputs-label">
                {props.label}
            </div>

            <input 
            className="inputs-input"
            type="email"
            placeholder={props.placeholder} 
            onInput={(e)=>{
                editInput(e);                   
            }}
            />

            <div className="inputs-error-text">{error}</div>

        </label>
    )
}

export default InputMail;