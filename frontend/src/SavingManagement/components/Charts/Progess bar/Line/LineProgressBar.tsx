import React from 'react'

interface ProgressBarProps {
    progress: number
}

const LineProgressBar: React.FC<ProgressBarProps> = ({progress}) => {
  return (
    <div className='w-3/5 bg-gray-200 rounded-full h-4'>
      <div className="bg-[#BB0A01] rounded-full h-4" style={{width:`${progress}%`}}></div>
    </div>
  )
}

export default LineProgressBar
