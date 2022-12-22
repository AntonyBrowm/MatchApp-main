import {User } from '@enroute/definitions';
import AddIcon from '@mui/icons-material/Add';
import { FC } from 'react';
import './styles.scss';

const ProfileCard: FC<User> = ({image_profile,name}) => {
  return (
    <>
    <div className='card-profile-container elevation-100'>
    <span className='frame'>
    <img  className='image-container' src={image_profile} />
    </span>
    <div className='bio-profile-container'>
    <h1 className='title-name'>{name}</h1>
    <h3 className='title-bio'></h3>
    <ul className='list-container'>
      <li className='activitie-container'>Arte</li>
      <li className='activitie-container'>Gimnasio</li>
      <li className='activitie-container'>Cafe</li>
      <li className='activitie-container'>Peliculas</li>
      <li className='activitie-container'>Deporte</li>
      <li className='activitie-container'>Añadir más <AddIcon/> </li>
    </ul>

    </div>
    </div>
    </>
  );
};

export default ProfileCard;
