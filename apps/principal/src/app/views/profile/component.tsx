import './styles.scss';
import ProfileCard from '../../components/cardProfile/component';
import { mockGeneralUser } from '@enroute/definitions';

const Profile = () => {
  return <div><ProfileCard{...mockGeneralUser}/></div>;
};

export default Profile;
