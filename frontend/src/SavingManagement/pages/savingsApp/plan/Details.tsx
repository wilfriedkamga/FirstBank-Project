import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plan } from "./Plans";
import axios from "axios";
import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Header from "../../../components/header/Header";
import BottomNavigation from "../../../components/bottom navigation/BottomNavigation";
import { addDays, format } from "date-fns";

interface saving {
  reason: string; // Assuming 'reason' is what you want as the label
  startDate: Date;
  dueDate: Date;
  reminder: Date[];
  savingBalance: string; // Make sure to parse this if it's a string
  amountTarget: string; // Make sure to parse this if it's a string
  id: string;
}

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [showEditPopover, setShowEditPopover] = useState(false);
  const [showDeletePopover, setShowDeletePopover] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = React.useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isDecimal, setIsDecimal] = useState(false)
  const [finishType, setFinishType] = useState('')
  const [reason, setReason] = useState<string | undefined>('')
  const [target, setTarget] = useState<number | undefined>(0)
  const [frequency, setFrequency] = useState<string>('')
  const [customFrequencyType, setCustomFrequencyType] = useState<string>('')
  const [customFrequency, setCustomFrequency] = useState<number | null>(null)
  

  const phone = "+237695964361";

  useEffect(
    () => {
      if (id) {
        fetchPlanDetails(id);
      }
    },
    [id]
  )

  const fetchPlanDetails = async (id: string) => {
    try {
      const response = await axios.get<saving>(
        `http://localhost:8085/savingsplanManagement/get-saving/${id}`
      );
      setPlan(response.data)
      setStartDate(response.data.startDate)
      setDueDate(response.data.dueDate)
      setTarget(parseFloat(response.data.amountTarget))
      setReason(response.data.reason)
      setSelectedDates(response.data.reminder)
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPlan = () => {
    setShowEditPopover(!showEditPopover);
  };

  const handleDelete = () => {
    setShowDeletePopover(!showDeletePopover);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setFrequency(selectedOption)
    setFinishType('')
    if (selectedOption === 'Other') {
      setIsOtherSelected(true);
      setSelectedDates([])
    } else {
      setIsOtherSelected(false);
    }
  };

  useEffect(() => {
    if((frequency || customFrequency) && dueDate && startDate) {
      let days = 1
      if (frequency){
        switch(frequency) {
          case 'Weekly':
            days = 7
            break;
          case 'Monthly':
            days = 30
            break;
          case 'Daily':
            days = 1
            break;
          case 'Yearly':
            days = 365
            break;
          case 'Other':
            if(customFrequency){
              days = customFrequency
            }
            break;
        }
      }
      if (customFrequencyType && customFrequency) {
        switch (customFrequencyType) {
          case 'Day':
            days = customFrequency
            break
          case 'Week':
            days = customFrequency * 7
            break
          case 'Month':
            days = customFrequency * 30
            break
          case 'Year':
            days = customFrequency * 365
            break
        }
      }
      newAlgoSelectDates(days)
    }
  }, [finishType, frequency, customFrequencyType, customFrequency])


  const newAlgoSelectDates = (f: number) => {
    setSelectedDates([])
    if (!dueDate || !startDate || !(dueDate instanceof Date) || !(startDate instanceof Date)    ) return
    let dates: Date[] = [];
    const numberOfDates = (dueDate.getTime() - startDate.getTime()) / (1000*60*60*24*f)
    
    console.log(numberOfDates)
    if ((numberOfDates - ((Math.trunc(numberOfDates))) < 1) && ((numberOfDates - (Math.trunc(numberOfDates))) > 0)) {
      setIsDecimal(true)
    } else {
      setIsDecimal(false)
    }

    for ( let i = 0; i<= Math.trunc(numberOfDates); i++){
      let temp = startDate
      temp = addDays(temp, f*i)
      dates.push(temp)
    }

    if(finishType === "late") {
      let lastDate = selectedDates[selectedDates.length - 1]
      lastDate = addDays(lastDate, f)
      dates.push(lastDate)
      setDueDate(lastDate)
    }

    setSelectedDates(dates)
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value? new Date(e.target.value) : null
    setStartDate(newStartDate)
    if (plan && newStartDate) {
      plan.startDate = newStartDate
    }
  }

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDueDate = e.target.value? new Date(e.target.value) : null
    setDueDate(newDueDate)
    if (plan && newDueDate) {
      plan.dueDate = newDueDate
    }
    if(!isOtherSelected) {
      setSelectedDates([])
    }
  }

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setReason(title)
    if (plan) {
      plan.reason = title
    }
  }

  const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value
    setTarget(parseFloat(amount))
    if (plan) {
      plan.amountTarget = amount
    }
  }

  const submitForm = () => {
    if (plan) {
      const saving = {
        id: id,
        reason: plan.reason,
        reminder: selectedDates.map(date => format(date, "yyyy-MM-dd")),
        amountTarget: parseFloat(plan.amountTarget),
        startDate: format(plan.startDate, "yyyy-MM-dd"),
        dueDate: format(plan.dueDate, "yyyy-MM-dd")
      };

      axios
        .put(
          `http://localhost:8085/savingsplanManagement/update-savings/${phone}/${id}`,
          saving
        )
        .then(response => {
          console.log(response.data);
          window.location.href = `/savings/plan/${id}`;
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const deletePlan =  () => {
    if (plan) {
      const saving = {
        id: id,
        reason: plan.reason,
        reminder: selectedDates.map(date => format(date, "yyyy-MM-dd")),
        amountTarget: parseFloat(plan.amountTarget),
        startDate: format(plan.startDate, "yyyy-MM-dd"),
        dueDate: format(plan.dueDate, "yyyy-MM-dd")
      };

      axios.delete(`http://localhost:8085/savingsplanManagement/delete-saving`, {data: saving})
      .then(response => {
        console.log(response.data);
        window.location.href = `/savings/all-plans`;
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  const previousPage = () => {
    window.history.back();
  };

  return (
    <div className="w-full h-full p-2 flex flex-col">
      <div className="border-b border-gray-200 w-full h-fit p-2 z-20">
        <Header />
      </div>
      <div className="flex flex-col pt-5 h-full w-full space-y-8 overflow-auto">
        {plan &&
          <div className="h-3/4">
            <div className="pt-5 ml-3 border-b flex justify-start border-gray-200">
              <div className="flex cursor-pointer mb-5" onClick={previousPage}>
                <ChevronLeftIcon className="h-6 w-6 my-auto md:h-8 md:w-8 md:hidden" />
                <h2 className="font-title font-semibold py-1 text-[#0C1013] text-lg md:text-xl">
                  Plan - {plan.reason}
                </h2>
              </div>
            </div>
            <div className="rounded-lg shadow-md w-full p-5 bg-[#BB0A01] flex justify-between">
              <div className="items-center">
                <h1 className="font-title text-base font-medium text-white text-gray-700">
                  Savings Balance
                </h1>
                <span className="text-2xl font-title">
                  {plan.savingBalance} XAF
                </span>
              </div>
              <div className="" />
            </div>
            <div className="w-full relative flex flex-col bg-white rounded-lg mt-5 h-full p-4 font-title">
              {/* <Tab tabs={tabs} /> */}
              <div className="flex justify-between h-20 items-center mb-5">
                <div className="">Target</div>
                <div className="text-2xl">
                  {plan.amountTarget}
                </div>
              </div>
              <div className="flex justify-between h-20 items-center mb-5">
                <div className="">Start Date</div>
                <div className="text-2xl">
                  {format(plan.startDate, "dd-MM-yyyy")}
                </div>
              </div>
              <div className="flex justify-between h-20 items-center mb-5">
                <div className="">Deadline</div>
                <div className="text-2xl">
                  {format(plan.dueDate, "dd-MM-yyyy")}
                </div>
              </div>
              <div className="flex absolute md:w-1/2 w-full justify-between bottom-0 right-0 p-4 space-x-5">
                <div
                  className="bg-[#BB0A01] rounded w-1/3 h-12 font-title text-white py-3 text-center cursor-pointer"
                  onClick={handleEditPlan}
                >
                  Edit
                </div>
                <div className="bg-[#BB0A01] rounded w-1/3 h-12 font-title text-white py-3 text-center"> Top-up / Withdraw </div>
                <div
                  className="bg-[#BB0A01] rounded w-1/3 h-12 font-title text-white py-3 text-center cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>}
      </div>
      <div className="w-full h-fit z-20">
        <BottomNavigation />
      </div>
      {plan &&
        showEditPopover &&
        <div
          className={`absolute z-20 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 ${showEditPopover
            ? "opacity-100"
            : "opacity-0"} transition duration-300 ease-in-out`}
        >
          <div
            className={`bg-white h-3/4 font-title mx-auto relative max-w-sm overflow-hidden md:max-w-7xl rounded-md p-4 w-full ${showEditPopover
              ? "cale-100"
              : "cale-50"} transition flex flex-col duration-300 ease-in-out`}
          >
            <div className="flex justify-between mb-10">
              <h1 className="text-2xl font-title font-semibold">Edit</h1>
              <div className="cursor-pointer" onClick={() => window.location.reload()}>
                <XMarkIcon className="h-8 w-8" />
              </div>
            </div>
            <form className="overflow-y-auto mb-10 flex flex-col">
              <div className="md:flex-1 mt-2 md:mt-0 md:px-3">
                <div className="p-2.5">
                  <label
                    className="text-md font-title font-medium ml-5"
                    htmlFor="reason"
                  >
                    Reason
                  </label>
                  <input
                    type="text"
                    id="reason"
                    name="reason"
                    value={reason}
                    onChange={handleReasonChange}
                    className="w-full shadow font-title p-4 rounded-lg focus:outline-red-500"
                  />
                </div>
                <div className="md:flex w-full p-2.5">
                  <div className="mb-2 w-full pr-2">
                    <label
                      className="text-md font-title font-medium ml-5"
                      htmlFor="startDate"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={startDate? format(startDate, 'yyyy-MM-dd')  : ''}
                      onChange={handleStartDateChange}
                      className="w-full shadow-inner font-title p-4 rounded-lg border-0 focus:outline-red-500"
                    />
                  </div>
                  <div className="mb-2 w-full pl-2">
                    <label
                      className="text-md font-title font-medium ml-5"
                      htmlFor="startDate"
                    >
                      Deadline
                    </label>
                    <input
                      type="date"
                      id="deadLine"
                      name="deadLine"
                      value={dueDate? format(dueDate, 'yyyy-MM-dd') : ''}
                      onChange={handleDueDateChange}
                      className="w-full shadow-inner font-title p-4 rounded-lg border-0 focus:outline-red-500"
                    />
                  </div>
                </div>
                <div className="p-2.5">
                  <label
                    className="text-md font-title font-medium ml-5"
                    htmlFor="amountTarget"
                  >
                    Amount Target
                  </label>
                  <input
                    type="number"
                    id="amountTarget"
                    name="amountTarget"
                    value={target}
                    onChange={handleTargetAmountChange}
                    className="w-full shadow-inner font-title p-4 rounded-lg border-0 focus:outline-red-500"
                  />
                </div>
                <div className="p-2.5">
                  <label htmlFor="frequency" className="text-md font-title font-medium ml-5">Frequency</label>
                  <select id="frequency" className="w-full shadow-inner p-4 rounded-lg border-0 font-title bg-white focus:outline-red-500" onChange={handleFrequencyChange}>
                    <option value="">Choose your frequency</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {isOtherSelected && (
                  <div className="md:flex w-full p-2.5">
                    <div className="w-full pr-2">
                      <label htmlFor="customFrequencyType" className="text-md font-title font-medium ml-5">Custom Frequency Type</label>
                      <select id="customFrequencyType" className="w-full shadow-inner p-4 rounded-lg border-0 font-title bg-white focus:outline-red-500" value={customFrequencyType} onChange={(e) => setCustomFrequencyType(e.target.value)}>
                        <option value="">Select Type</option>
                        <option value="Day">Day</option>
                        <option value="Week">Week</option>
                        <option value="Month">Month</option>
                        <option value="Year">Year</option>
                      </select>
                    </div>
                    <div className="w-full pl-2">
                      <label htmlFor="customFrequency" className="text-md font-title font-medium ml-5">Custom Frequency</label>
                      <input id="customFrequency" className="w-full shadow-inner font-title p-4 rounded-lg border-0 focus:outline-red-500" type="number" value={customFrequency? customFrequency : 0} onChange={(e) => setCustomFrequency(parseInt(e.target.value))} />
                    </div>
                  </div>
                )}
                <div className="w-full p-2.5">
                  <label className="text-md font-title font-medium ml-5">Selected Dates</label>
                  <div className="flex flex-wrap">
                    {selectedDates.map((date) => (
                      <div key={format(date, "yyyy-MM-dd")} className="bg-blue-500 text-white p-2 font-title rounded-lg m-1">
                        {format(date, 'MM/dd/yyyy')}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
            <div className="w-full bg-white flex justify-end absolute bottom-0 pr-5">
              <div
                className="mr-5 mb-2 py-2.5 px-10 bg-[#BB0A01] rounded-full w-fit text-nowrap text-white font-title cursor-pointer"
                onClick={submitForm}
              >
                Save updates
              </div>
            </div>
          </div>
        </div>}
      {plan &&
        showDeletePopover &&
        <div
          className={`absolute z-20 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 ${showDeletePopover
            ? "opacity-100"
            : "opacity-0"} transition duration-300 ease-in-out`}
        >
          <div
            className={`bg-white h-1/4 font-title mx-auto max-w-sm md:max-w-6xl rounded-md p-4 w-full ${showDeletePopover
              ? "cale-100"
              : "cale-50"} transition flex flex-col duration-300 ease-in-out`}
          >
            <h1 className="text-2xl font-title font-semibold flex leading-8">
              Delete plan -{" "}
              <p className="font-medium text-2xl ml-2"> {plan.reason}</p>
            </h1>
            <p className="pt-5">Are you sure to delete?</p>
            <div className="relative h-full">
              <div className="flex justify-end space-x-2 absolute bottom-0 right-0">
                <button
                  className="bg-[#BB0A01] rounded h-12 font-title text-white py-3 px-5 text-center"
                  onClick={handleDelete}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#BB0A01] rounded h-12 font-title text-white py-3 px-5 text-center"
                  onClick={deletePlan}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>}
        {startDate && dueDate && (selectedDates.length !== 0) && isDecimal && (
          <div className={`absolute z-20 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 ${isDecimal
            ? "opacity-100"
            : "opacity-0"} transition duration-300 ease-in-out`}>
              <div className={`bg-white h-fit font-title mx-auto relative max-w-sm overflow-hidden md:max-w-5xl rounded-md p-4 w-full ${isDecimal
                ? "cale-100"
                : "cale-50"} transition flex flex-col duration-300 ease-in-out`}>
                  <div className="flex justify-between mb-8">
                    <h1 className="text-2xl font-title font-semibold">Finish Type</h1>
                    <div className="cursor-pointer" onClick={() => setIsDecimal(false)}>
                      <XMarkIcon className="h-8 w-8" />
                    </div>
                  </div>
                  <p className="text-base mb-3">The last contribution date is before the deadline. Choose <span className='font-semibold'>Early Finish</span> to finish before the deadline or <span className='font-semibold'>Late Finish</span> to extend the deadline to match the last contribution date. <br /> <span className='font-light text-sm'>You can also close this box and change the deadline at your please</span></p>
                  <div className="w-full h-full flex p-2.5 space-x-3">
                    <div className="w-full text-white text-center py-20 bg-[#BB0A01] rounded-md cursor-pointer   " onClick={() => {setFinishType('early'); setIsDecimal(false)}}>Early Finish</div>
                    <div className="w-full text-white text-center py-20 bg-[#BB0A01] rounded-md cursor-pointer" onClick={() => {setFinishType('late'); setIsDecimal(false)}}>Late Finish</div>
                  </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Details;
