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
    <button
      className='lint-button'
      style={{ outline: 'none' }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
