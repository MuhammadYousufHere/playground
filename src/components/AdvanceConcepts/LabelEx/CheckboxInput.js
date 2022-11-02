import React from 'react';

const CheckboxInput = ({ checked, setChecked }) => {
    // if CheckboxInput is used outside of parent i.e checkbox then there are two ways to fix
    // either implement custom handler on the basis of condition ot simply throw an error
    return (
        <input
            type='checkbox'
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
        />
    );
};

export default CheckboxInput;
