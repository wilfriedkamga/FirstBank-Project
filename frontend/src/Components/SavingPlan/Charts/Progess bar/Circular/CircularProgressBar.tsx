import React from 'react'

interface CircularProgressBarProps {
    progress : number;
    size: number;
    strokeWidth: number;
    circleColor: string;
    progressColor: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
    progress,
    size,
    strokeWidth,
    circleColor,
    progressColor,
}) => {
    const radius = size / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (progress / 100) * circumference;
    const dashArray = `${circumference} ${circumference}`;
  return (
    <svg width={size} height={size} >
      <g transform={`rotate(-90 ${radius} ${radius})`}>
        <circle
          cx={radius}
          cy={radius}
          r={radius}
          stroke={circleColor}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          fill="transparent"
          strokeDashoffset={0}
        />
        <circle
          cx={radius}
          cy={radius}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </g>
      <text x='50%' y='50%' dominantBaseline={'central'} textAnchor='middle' className='font-title font-medium'>
        {progress}%
      </text>
    </svg>
  )
}

export default CircularProgressBar
