import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div
      className={`bg-${type}-500 text-[#0C1013] px-4 py-2 rounded font-title flex items-center`}
    >
      <span className={`text-lg border-3 border-black mr-2 ${type === 'success'? 'text-green-500' : type === 'error'? 'text-red-500' : type === 'warning'? 'text-orange-500' : 'text-blue-500'}`}>
        {type === 'success'? '' : type === 'error'? '' : type === 'warning'? '' : ''}
      </span>
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default Notification;