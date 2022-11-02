import React from 'react';
import { useLocalStorage } from '../Hooks';

const Playarea = ({}) => {
    const [value, setValue] = useLocalStorage('name', {
        nameIs: 'Muhammad Yousuf',
    });
    console.log(value);
    return <div>playarea</div>;
};

export default Playarea;
