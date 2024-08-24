import React from 'react'
import { Link } from 'react-router-dom';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Plan {
    label: string;
    duedate: string;
    progress: number;
    id: string;
}

const plans : Plan[] = [
    {
        label:'Organize The Graduation',
        duedate:'Sun 28/04',
        progress: 50,
        id: '012',
    }, 
    {
        label: 'Buy A computer',
        duedate: 'Thu 03/05',
        progress: 12,
        id: '013',
    },
    {
        label: 'Vacancy Travel to Chicago',
        duedate: 'Sam 23/11',
        progress: 7,
        id: '014',
    }
]

const LastOngoingPlan = () => {
    const [slideIndex, setSlideIndex] = React.useState(0);

    const goToSlide = (n: number) => {
        setSlideIndex(n)
    }
    const prevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === 0? plans.length - 1 : prevIndex - 1))
    }
    const nextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === plans.length - 1? 0 : prevIndex + 1))
    }
  return (
    <div className='relative'>
        <div className="overflow-hidden">
            <div className={`flex transition-transform duration-500 ease-in-out ${slideIndex === 0 ? 'transform translate-x-0' : ''}`} style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                {plans.map((plan, index) => 
                    <div key={index} className="w-full flex flex-shrink-0 rounded-xl md:w-4/6 shadow-lg bg-white" style={{ width: '100%', height: '15rem'}}>
                        <Link to={'/savings/plan'+ plan.id} className='w-full rounded-xl'>
                            <div className="flex flex-col p-5 space-y-2.5">
                                <p className="font-account font-bold text-2xl text-[#BB0A01]">{plan.label}</p>
                                <div className="flex flex-row justify-between w-full">
                                    <div className="flex flex-col mt-5 ml-10 p-2.5 items-center">
                                        <p className="font-title font-semibold text-sm text-[#0C1013]"> Due date </p>
                                        <p className="text-xl text-[#0C1013] mt-5">{plan.duedate}</p>
                                    </div>
                                    <div className="justify-end mr-10">
                                        <CircularProgressbar value={plan.progress} text={`${plan.progress}%`} className='w-24 h-24 mt-8 left-0' styles={buildStyles({trailColor: '#BB0A01', pathColor: '#818282', textSize:'24px', rotation:0.375, textColor: '#0C1013'})}/>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
        {/* Previous button */}
        <button
            className="absolute top-1/3 left-0 z-10 p-4 text-white ml-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
            onClick={prevSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>

        {/* Next button */}
        <button
            className="absolute top-1/3 right-0 z-10 p-4 text-white mr-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
            onClick={nextSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </div>
  )
}

export default LastOngoingPlan
