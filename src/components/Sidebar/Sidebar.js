import './style.scss';
// &#9776;
const Sidebar = ({ onShow }) => {
  return (
    <nav className={onShow ? 'nav-container' : 'nav-container-open'}>
      <button
        onClick={onShow}
        className='nav-toggle'
      >
        <span className='hamburger'>&#9776;</span>
      </button>
      <ul className='nav-list'>
        <li className='nav-item'>
          <a href='/'>Home</a>
        </li>
        <li className='nav-item'>
          <a href='/'>About</a>
        </li>
        <li className='nav-item'>
          <a href='/'>Blog</a>
        </li>
        <li className='nav-item'>
          <a href='/'>Contact US</a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
