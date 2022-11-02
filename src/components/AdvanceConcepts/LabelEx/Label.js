import React from 'react';

const Label = ({ htmlFor = 'input', checked, setChecked, children }) => {
    return (
        <label htmlFor={htmlFor} onClick={() => setChecked(!checked)}>
            {children}
        </label>
    );
};

export default Label;
