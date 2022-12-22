import { mockopChats, UserPreview } from '@enroute/definitions';
import { FC } from 'react';
import ChatList from '../chatList/component';
import './styles.scss';

const CardMatch = () => {
  return (<>
  <div className="containers elevation-100">
  <div className="chats-container card elevation-100">
        <ChatList chats={mockopChats} />
      </div>
  <div className="carrousel-container card elevation-500">
    DONDE ESTAN LAS SOLTERAS
      </div>
    </div></>);
};

export default CardMatch;
