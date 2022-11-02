import React, { useState } from 'react';
import CountItem from './CountItem';

const Counter = () => {
    const [number, setNumber] = useState(0);
    return (
        <div>
            <CountItem number={number} />
            <button onClick={() => setNumber((prev) => prev + 1)}>
                Increase
            </button>
            <button
                onClick={() =>
                    setNumber((prev) => (number >= 1 ? prev - 1 : prev))
                }>
                Decrease
            </button>
            {number}
        </div>
    );
};

export default Counter;
