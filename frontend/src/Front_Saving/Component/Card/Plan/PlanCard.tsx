import React from 'react'
import LineProgressBar from '../../Charts/Progess bar/Line/LineProgressBar'

export interface PlanCardProps {
    id: string;
    label : string
    startDate : string
    endDate : string
    target: number
    progress: number
}

const PlanCard: React.FC<PlanCardProps> = ({
    id,
    label,
    startDate,
    endDate,
    target,
    progress,
}) => {
  return (
    <div className='bg-white shadow-md w-full h-44 rounded-lg px-6 py-4'>
      <div className="flex justify-between items-center font-title mb-5">
        <h2 className="font-bold text-lg">{label}</h2>
        <div className="flex flex-col font-title">
            <p className="text-sm text-nowrap"> Starting on :</p>
            <p className="text-sm font-bold">{startDate}</p>
        </div>
      </div>
      <div className="flex justify-start items-center mb-5">
        <LineProgressBar progress={progress} />
        <p className="text-sm font-title ml-3 font-bold">{progress}%</p>
      </div>
      <div className="flex justify-between font-title items-center">
        <div className="">
          <p className="text-sm">Target Amount:</p>
          <p className="text-sm font-bold">{target}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-nowrap">Ends on:</p>
          <p className="text-sm font-bold">{endDate}</p>
        </div>
      </div>
    </div>
  )
}

export default PlanCard
