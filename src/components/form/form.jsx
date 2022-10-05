import './form.css';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formSlice } from '../../store/form';

function Form(props){

    

    return (
        <div id={props.id} className="form">
            {props.children}
        </div>
    );
}

export default Form;