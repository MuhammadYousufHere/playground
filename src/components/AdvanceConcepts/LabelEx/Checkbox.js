import React, { useState } from 'react';
import CheckboxInput from './CheckboxInput';
import Label from './Label';

const Checkbox = ({ children }) => {
    const [checked, setChecked] = useState(true);
    const renderChildren = React.Children.map(children, (child) => {
        //- 1 allowing any type of children to be messed around
        // if (typeof child.type !== 'function') return child;

        // *2 Restricting Dom elements to be passed
        // if (typeof child.type === 'string')
        //     throw new Error(
        //         `< ${child.type}/> is not allowed inside <Checkbox /> component`
        //     );
        // setting priorties
        // if (child.type !== Label && child.type !== CheckboxInput)
        //     throw new Error(
        //         `Only <Label /> and <CheckboxInput /> are allowed inside <Checkbox /> component`
        //     );

        const clone = React.cloneElement(child, {
            checked,
            setChecked,
        });
        return clone;
    });
    return renderChildren;
};

export default Checkbox;
