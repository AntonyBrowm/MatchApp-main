import { getFormatDateYYYYMMDD } from '@enroute/helpers';
import { ChatPreview } from '@enroute/definitions';
import { FC } from 'react';
import './styles.scss';

interface ChatListProps {
  chats: ChatPreview[];
}

const ChatList: FC<ChatListProps> = ({ chats }) => {
  return (
    <>
      {chats.map((chat) => (
        <div className="chat-preview-container">
          <div className="chat-preview-image-container elevation-40">
            <img
              className="chat-preview-image"
              src={chat.image_profile}
              alt="receiver look"
            />
          </div>
          <div className="chat-preview-info-container">
            <p className="chat-preview-info-title">{chat.receiver}</p>
            <p className="chat-preview-info-message">{chat.last_message}</p>
          </div>
          <div className="chat-preview-date-container">
            <p className="chat-preview-date">{getFormatDateYYYYMMDD()}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatList;
