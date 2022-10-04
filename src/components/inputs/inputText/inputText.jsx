import '../inputs.css';
import React, { useState } from 'react';

function InputText(props){
    const minLength = parseInt(props.minLength);
    const maxLength = parseInt(props.maxLength);

    const [value, setValue] = useState('');
    const [focus, setFocus] = useState(false);
    const [error, setError] = useState('');

    const editInput = (e)=>{
        let inputValue = e.target.value;

        setError('');

        if(minLength && inputValue.length < minLength){
            setError(`minimum ${minLength} characters`);
        }

        if(maxLength && inputValue.length > maxLength){
            inputValue = inputValue.slice(0, -1);
        }   

        setValue(inputValue);
        e.target.value = inputValue;
    }   

    return ( 
        <label id={props.id} className="inputs input-text" onFocus={()=>{ setFocus(true) }} onBlur={()=>{ setFocus(false); }} data-error={ error && !focus ? 'true' : 'false' }>

            <div className="inputs-label">
                {props.label}
            </div>

            <input 
            className="inputs-input"
            type="text"
            placeholder={props.placeholder} 
            onInput={(e)=>{
                editInput(e);                   
            }}
            />

            <div className="inputs-error-text">{error}</div>

        </label>
    )
}

export default InputText;