import React from 'react';
import { useSelector } from 'react-redux';

const ChatMessage = ({ item }) => {
  const auth = useSelector((state) => state.auth);
  const isCurrentUser = auth.user?.id === item.user?.id;
  // console.log('item', item);
  return (
    <div
      className={`flex ${
        isCurrentUser ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      <div
        className={`p-2 ${
          isCurrentUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-black'
        } rounded-lg max-w-xs break-words`}
      >
        {item.image && (
          <img
            className="w-full h-auto object-cover rounded-lg mb-2"
            src={item.image}
            alt=""
          />
        )}
        <p>{item.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
