import { FC } from 'react';
import './styles.scss';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillPhone,
} from 'react-icons/ai';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-match-info">
        <div className="footer-logo-container">

        </div>
        <div className="footer-menu-options">
          <div className="contact-info-container">
            <div className="social-container">
              <AiFillFacebook />
              <AiFillInstagram />
              <AiFillLinkedin />
              <AiOutlineTwitter />
              <AiFillYoutube />
            </div>
          </div>
          <div>
            <div className="stores-logo-container">
              <img
                className="logo-apple"
                alt="logo-apple"
                src={require('../../../assets/apple.webp')}
              />
              <img
                className="logo-google"
                alt="logo-google"
                src={require('../../../assets/playstore.png')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-container">
        <div className="copyright-docs-container">
        </div>
      </div>
    </footer>
  );
};
