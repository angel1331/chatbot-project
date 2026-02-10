import RobotProfileImage from '../assets/monkey.png';
import UserProfileImage from '../assets/user.gif';
import './ChatMessage.css';

function ChatMessage({message, sender, time}) {

  return(
    <div className={
      sender === 'user' 
      ? 'chatbot-message-user' 
      : 'chatbot-message-robot'
    }>
      {sender === 'robot' && (
        <img src={RobotProfileImage} className="chatbot-message-profile"/>
      )}
      <div className="chatbot-message-text">
        <div>
        {message}
        </div>
        <div>
          <span className='time'>{time}</span>
        </div>
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} alt="" className="chatbot-message-profile"/>
      )}
    </div>
  );
}

export default ChatMessage;