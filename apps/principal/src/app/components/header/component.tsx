import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import HomeIcon from '@mui/icons-material/Home';
export interface HeaderRoute {
  name: string;
  path: string;
}

const headerButtons: HeaderRoute[] = [
  {
    name: 'Home',
    path: '/home',
  },
  {
    name: 'Profile',
    path: '/profile',
  },
  {
    name: 'Match',
    path: '/match',
  },
  {
    name: 'Config',
    path: '/config',
  },
];


export const Header: FC = () => {
  const [actualPage, setActualPage] = useState<HeaderRoute>(headerButtons[0]);

const LogOut = () => {
  localStorage.clear();
};
  return (
    <header className="header" role="navigation" key="header">
           <img
                className="logo-google"
                alt="logo-google"
                src={require('../../../assets/logo.jpg')}
              />
      <ul>
        {headerButtons.map((headerButton) => (
          <li
            key={headerButton.name}
            className={
              actualPage.name === headerButton.name ? 'active-link' : ''
            }
          >
            <Link
              onClick={() => setActualPage(headerButton)}
              to={headerButton.path}
            >
              {headerButton.name}
            </Link>
          </li>
        ))}
        <li> <Button className="button" onClick={LogOut}>Log Out</Button></li>
      </ul>
    </header>
  );
};
