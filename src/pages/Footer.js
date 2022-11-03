import React from 'react';
import './Footer.scss';
import apple from '../assets/apple.png';
import gp from '../assets/google-play.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  return (
    <div className='footer-container'>
      <footer className='footer-content'>
        <div className='row top'>
          <div className='go'>
            <img
              src={gp}
              alt='play-store'
            />
          </div>
          <div className='go'>
            <img
              src={gp}
              alt='apple-store'
            />
          </div>
        </div>
        <div className='row middle'>
          <ul>
            <li>
              <a href='/'>About Us</a>
            </li>
            <li>
              <a href='/'>Blog</a>
            </li>
            <li>
              <a href='/'>FAQ</a>
            </li>
            <li>
              <a href='/'>Privacy Policy</a>
            </li>
            <li>
              <a href='/'>Terms of use</a>
            </li>
          </ul>
        </div>
        <div className='row down'>
          <ul>
            <li>
              <a href='/'>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href='/'>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href='/'>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
// padding-bottom: 3px;
//     background-color: rgba(103,120,255,0.1)!important;
// }

export default Footer;
