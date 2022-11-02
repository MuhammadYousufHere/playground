import React from 'react';
import './Button.css';
const Button = (
    type = 'a',
    to = '#',
    onClick,
    title = 'Button',
    variant = '',
    ...otherProps
) => {
    return (
        // {/* onClick ? ( */}
        <button
            className='lint-button'
            style={{ outline: 'none' }}
            onClick={onClick}
            {...otherProps}>
            {title}
        </button>
        // {/* ) :
        // {variant === 'link' ? (
        //     <a className='lint-button' href={to} {...otherProps}>
        //         {title}
        //     </a>
        // ) : (
        //     <a className='button-1' href={to} {...otherProps}>
        //         {title}
        //     </a>
        // )} */}
    );
};

export default Button;
