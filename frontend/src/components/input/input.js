import React from 'react';

import './input.css';

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className='group'>
        <input className='form-input' onChange={handleChange} {...otherProps} />
        {label ? (
            <label className="form-input-lable">
                {label}
            </label>
        ) : null}
    </div>
);

export default FormInput;
