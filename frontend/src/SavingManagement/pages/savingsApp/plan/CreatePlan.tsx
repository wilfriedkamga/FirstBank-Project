import React, { useState } from 'react'
import BottomNavigation from '../../../components/bottom navigation/BottomNavigation'
import Calendar from '../../../components/calendar/Calendar'
import { addDays, format, startOfWeek } from 'date-fns'
import axios from 'axios'
import { error } from 'console'
import { request } from '../../../axios_helper'
import Header from '../../../components/header/Header'
import Footer from '../../../../UserManagement/User/Components/Elementary/Footer/Footer'

const CreatePlan = () => {
  const [isOtherSelected, setIsOtherSelected] = React.useState(false)
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [reason, setReason] = useState<string | null>(null)
  const [target, setTarget] = useState<number | null>(null)
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    if (selectedOption === 'Other') {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
      if(dueDate) {
        let dates: Date[] = []
        switch (selectedOption) {
          case 'Every Beginning of the week':
            let currentDate = addDays(startOfWeek(new Date()), 1);
            while (currentDate <= dueDate) {
              dates.push(currentDate)
              currentDate = addDays(currentDate, 7)
            }
            break;
          case 'Every Three days':
            let currentDateThreeDays = new Date();
            while (currentDateThreeDays <= dueDate) {
              dates.push(currentDateThreeDays)
              currentDateThreeDays = addDays(currentDateThreeDays, 3)
            }
            break;
          case 'Everyday':
            let currentDateEveryDay = new Date();
            while (currentDateEveryDay <= dueDate) {
              dates.push(currentDateEveryDay)
              currentDateEveryDay = addDays(currentDateEveryDay, 1)
            }
            break;
        }
        setSelectedDates(dates)
      }
    }
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDueDate = new Date(e.target.value)
    setDueDate(newDueDate)
    if(!isOtherSelected) {
      setSelectedDates([])
    }
  }
  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setReason(title)
  }

  const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value)
    setTarget(amount)
  }

  const handleDateSelect = (date: Date) => {
    if(isOtherSelected){
      setSelectedDates([date])
      setIsOtherSelected(false)
    }
  }

  const submitForm = () => {
    if (reason && target && dueDate && selectedDates){
      const savings = {
        reason: reason,
        reminder: selectedDates.map((date) => format(date, 'yyyy-MM-dd')),
        amountTarget: target,
        dueDate: format(dueDate, 'yyyy-MM-dd'),
        phone: '+237695964361'
      }

      request('POST', '/savingsplanManagement/create-savings', savings)
        .then(response => {
          console.log(response.data)
          window.location.href = '/savings'
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  return (
    <div className='w-full  bg-white h-full flex flex-col'>
      
        <Header />
     
      <div className="md:flex mt-[15vh] mb-[10vh] min-h-[100%]  p-0.5 overflow-auto overscroll-contain">
        <div className="flex flex-col md:border-r pt-5 h-full w-full space-y-8">
          <div className="pt-5 ml-5 border-b flex justify-between border-gray-200">
            <h3 className='font-title font-semibold text-[#0C1013] text-lg'>Create a New Plan</h3>
            <div className=" mr-5 mb-2 py-2.5 px-5 bg-[#BB0A01] rounded-full text-white font-title cursor-pointer" onClick={submitForm}>
              Create
            </div>
          </div>
          <form className='h-full'>
            <div className="md:flex flex flex-col mb-8">
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="p-2.5">
                  <label className="text-md font-title font-medium ml-5">Reason</label>
                  <input className="w-full shadow-inner p-4 rounded-lg border-0 focus:outline-red-500" type="text" name="reason" placeholder="Buy A Computer" onChange={handleReasonChange}/>
                </div>
                <div className="md:flex w-full p-2.5">
                  <div className="mb-2 w-full pr-2">
                    <label className="text-md font-title font-medium ml-5">Target amount</label>
                    <input className="w-full shadow-inner p-4 rounded-lg border-0 focus:outline-red-500" type="number" name="Target amount" placeholder="237650" onChange={handleTargetAmountChange}/>
                  </div>
                  <div className="mb-2 w-full pl-2">
                    <label className="text-md font-title font-medium ml-5">Due date</label>
                    <input className="w-full shadow-inner p-4 rounded-lg border-0 bg-white focus:outline-red-500" type="date" name="dueDate" onChange={handleDueDateChange}/>
                  </div>
                </div>
                <div className=" w-full p-2.5">
                  <label htmlFor="frequency" className="text-md font-title font-medium ml-5">Frequency</label>
                  <select id="frequency" className="w-full shadow-inner p-4 rounded-lg border-0 bg-white focus:outline-red-500" onChange={handleFrequencyChange}>
                    <option>Every Beginning of the week</option>
                    <option>Every Three days</option>
                    <option>Everyday</option>
                    <option>Other</option>
                  </select>
                </div>
                {isOtherSelected && (
                  <div className="my-2 w-full p-2.5">
                    <label className="text-md font-title font-medium ml-5">Reminder</label>
                    <input className="w-full shadow-inner p-4 rounded-lg border-0 bg-white focus:outline-red-500" type="date" name="reminder" />
                  </div>
                )}
                {selectedDates.length > 0 && (
                  <div className="w-full p-2.5">
                    <label className="text-md font-title font-medium ml-5">Selected Dates</label>
                    <div className="flex flex-wrap">
                      {selectedDates.map((date) => (
                        <div key={date.toISOString()} className="bg-blue-500 text-white p-2 rounded-lg m-1">
                          {format(date, 'MM/dd/yyyy')}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="hidden md:contents">
          <Calendar onDateSelect={handleDateSelect} selectedDates={selectedDates}/>
        </div>
      </div>
      <div className="w-full h-fit z-20">
       <Footer />
      </div>
    </div>
  )
}

export default CreatePlan
