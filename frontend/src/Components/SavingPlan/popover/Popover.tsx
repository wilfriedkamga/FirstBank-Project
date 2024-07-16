import React from 'react'

interface PopoverProps {
    animation: string;
    onClose: () => void;
    width: 'lg' | 'sm';
    children: React.ReactNode;
  }

const Popover: React.FC<PopoverProps> = ({animation, onClose, width, children}) => {
  return (
    <div className={`absolute z-50 ${animation === 'fade'? 'animate-fade-in' : ''}`} style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)',}}>
      <div className="bg-white rounded shadow-md p-4">
        {children}
      </div>
    </div>
  )
}

export default Popover
