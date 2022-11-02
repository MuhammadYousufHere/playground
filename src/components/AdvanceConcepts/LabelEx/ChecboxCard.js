import React from 'react';
import Checkbox from './Checkbox';
import CheckboxInput from './CheckboxInput';
import Label from './Label';
const ChecboxCard = () => {
    return (
        <div>
            <Checkbox>
                <CheckboxInput />
                <Label>Check to agree</Label>
            </Checkbox>
        </div>
    );
};

export default ChecboxCard;
