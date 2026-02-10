import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import LoadingSpinnerImage from '../assets/loading-spinner.gif';
import './ChatInput.css';
import dayjs from 'dayjs';

export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const time = dayjs().valueOf();
  const todayTime = dayjs(time).format('HH:mm');

  function saveInputText(e) {
    setInputText(e.target.value);
  }

  async function sendMessage() {
    if(inputText.trim() === '' || isLoading) return;

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: todayTime
      }
    ];
    
    setChatMessages(newChatMessages);

    setInputText('');
    
    setIsLoading(true);

    setChatMessages([
      ...newChatMessages,
      {
        message: <img className='loading-spinner' src={LoadingSpinnerImage} />,
        sender: 'robot',
        id: 'loading-id'
      }
    ])

    const response = await Chatbot.getResponseAsync(inputText);
    
    setIsLoading(false);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: todayTime
      }
    ])
  }

  function clearChat() {
    setChatMessages([]);
    localStorage.removeItem('messages');
  }

  function hotKey(event) {
    if(event.key === 'Enter') {
      sendMessage();
    }

    if(event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="chatbot-input-container">					
      <input
        placeholder="Отправить сообщение ЧатБоту" 
        size="30"
        onChange = {saveInputText}
        value = {inputText}
        onKeyDown = {hotKey}
        className = "chatbot-input"
      />
      <button
        onClick={sendMessage}
        disabled={isLoading || inputText.trim() === ''}
        className="send-button"
      >
        Отправить
      </button>
      <button
        onClick={clearChat}
        className='clear-button'
      >
        Очистить чат
      </button>
    </div>
  );
}