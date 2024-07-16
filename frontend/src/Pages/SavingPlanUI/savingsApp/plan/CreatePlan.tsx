import React, { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Variable from "../../../../Variable";
import Header from "../../../../Components/SavingPlan/header/Header";
import Calendar from "../../../../Components/SavingPlan/calendar/Calendar";
import BottomNavigation from "../../../../Components/SavingPlan/bottom navigation/BottomNavigation";

const CreatePlan = () => {
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [reason, setReason] = useState<string>("");
  const [finishType, setFinishType] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isDecimal, setIsDecimal] = useState(false);
  const [frequentAmount, setFrequentAmount] = useState(0);
  const [preview, setPreview] = useState(false);
  const [target, setTarget] = useState<number>(0);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [frequency, setFrequency] = useState<string>("");
  const [customFrequencyType, setCustomFrequencyType] = useState<string>("");
  const [customFrequency, setCustomFrequency] = useState<number | null>(null);
  const [errors, setErrors] = useState({
    reason: "",
    target: "",
    startDate: "",
    dueDate: "",
    frequentAmount: "",
    selectedDates: "",
  });

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setFrequency(selectedOption);
    setFinishType("");
    if (selectedOption === "Other") {
      setIsOtherSelected(true);
      setSelectedDates([]);
    } else {
      setIsOtherSelected(false);
    }
  };

  useEffect(() => {
    if ((frequency || customFrequency) && dueDate && startDate) {
      let days = 1;
      if (frequency) {
        switch (frequency) {
          case "Weekly":
            days = 7;
            break;
          case "Monthly":
            days = 30;
            break;
          case "Daily":
            days = 1;
            break;
          case "Yearly":
            days = 365;
            break;
          case "Other":
            if (customFrequency) {
              days = customFrequency;
            }
            break;
        }
      }
      if (customFrequencyType && customFrequency) {
        switch (customFrequencyType) {
          case "Day":
            days = customFrequency;
            break;
          case "Week":
            days = customFrequency * 7;
            break;
          case "Month":
            days = customFrequency * 30;
            break;
          case "Year":
            days = customFrequency * 365;
            break;
        }
      }
      newAlgoSelectDates(days);
    }
  }, [finishType, frequency, customFrequencyType, customFrequency]);

  useEffect(() => {
    if (startDate && dueDate && selectedDates.length > 0) {
      const targetAmount = frequentAmount * selectedDates.length;
      setTarget(targetAmount);
    }
  }, [selectedDates]);

  useEffect(() => {
    if (startDate && dueDate && selectedDates.length > 0) {
      const frequentAmount = Math.round(target / selectedDates.length);
      setFrequentAmount(frequentAmount);
    }
  }, [target]);

  const newAlgoSelectDates = (f: number) => {
    setSelectedDates([]);
    if (!dueDate || !startDate) return;
    let dates: Date[] = [];
    const numberOfDates =
      (dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * f);

    console.log(numberOfDates);
    if (
      numberOfDates - Math.trunc(numberOfDates) < 1 &&
      numberOfDates - Math.trunc(numberOfDates) > 0
    ) {
      setIsDecimal(true);
    } else {
      setIsDecimal(false);
    }

    for (let i = 0; i <= Math.trunc(numberOfDates); i++) {
      let temp = startDate;
      temp = addDays(temp, f * i);
      dates.push(temp);
    }

    if (finishType === "late") {
      let lastDate = selectedDates[selectedDates.length - 1];
      lastDate = addDays(lastDate, f);
      dates.push(lastDate);
      setDueDate(lastDate);
    }

    setSelectedDates(dates);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value ? new Date(e.target.value) : null;
    setStartDate(newStartDate);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDueDate = e.target.value ? new Date(e.target.value) : null;
    setDueDate(newDueDate);
    if (!isOtherSelected) {
      setSelectedDates([]);
    }
  };

  const handleFrequentAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = parseInt(e.target.value);
    setFrequentAmount(amount);
    if (startDate && dueDate && selectedDates.length > 0) {
      const targetAmount = amount * selectedDates.length;
      setTarget(targetAmount);
    }
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setReason(title);
  };

  const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value);
    setTarget(amount);
    if (startDate && dueDate && selectedDates.length > 0) {
      const frequentAmount = Math.round(amount / selectedDates.length);
      setFrequentAmount(frequentAmount);
    }
  };

  const handleDateSelect = (date: Date) => {
    if (isOtherSelected) {
      setSelectedDates([date]);
      setIsOtherSelected(false);
    }
  };

  const submitForm = () => {
    if (reason && target && dueDate && selectedDates && startDate) {
      const user = Variable.getLocalStorageItem("user");
      const phone = user.user.phone;
      console.log(user);
      const savings = {
        reason: reason,
        reminder: selectedDates.map((date) => format(date, "yyyy-MM-dd")),
        amountTarget: target,
        startDate: format(startDate, "yyyy-MM-dd"),
        dueDate: format(dueDate, "yyyy-MM-dd"),
        phone: phone,
      };

      axios
        .post(
          `${Variable.saving_base_url}/savingsplanManagement/create-savings`,
          savings
        )
        .then((response) => {
          console.log(response.data);
          window.location.href = "/savings";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const validateForm = () => {
    let errors = {
      reason: "",
      target: "",
      startDate: "",
      dueDate: "",
      frequentAmount: "",
      selectedDates: "",
    };

    if (!reason) {
      errors.reason = "Please enter a reason for the plan";
    }

    if (!target) {
      errors.target = "Please enter a target amount";
    }

    if (!startDate) {
      errors.startDate = "Please enter a start date";
    }

    if (!dueDate) {
      errors.dueDate = "Please enter a due date";
    }

    if (startDate && dueDate && startDate > dueDate) {
      errors.startDate = "Start date cannot be after due date";
    }

    if (startDate && dueDate && startDate < new Date()) {
      errors.startDate = "Start date cannot be before today";
    }

    if (!frequentAmount) {
      errors.frequentAmount = "Please enter a frequent amount";
    }

    if (selectedDates.length === 0) {
      errors.selectedDates = "Please choose a frequency";
    }

    setErrors(errors);

    if (Object.values(errors).every((error) => error === "")) {
      setPreview(true);
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <Header />

      <div className="flex h-full mt-[10vh] mb-[20vh] p-0.5 overflow-auto overscroll-contain">
        <div className="flex flex-col md:border-r pt-5 h-full w-full space-y-8">
          <div className="pt-5 ml-5 border-b flex justify-between border-gray-200">
            <h3 className="font-title font-semibold text-[#0C1013] text-lg">
              Create a New Plan
            </h3>
            <div
              className="mr-5 mb-2 py-2.5 px-5 bg-[#BB0A01] rounded-full text-white font-title cursor-pointer"
              onClick={validateForm}
            >
              Next
            </div>
          </div>
          <form className="h-full">
            <div className="flex flex-col mb-8">
              <div className="md:flex-1 mt-2 md:mt-0 md:px-3">
                <div className="p-2.5">
                  <label className="text-md font-title font-medium ml-5">
                    Reason
                  </label>
                  <input
                    className="w-full shadow-inner font-title p-4 rounded-lg border-0 focus:outline-red-500"
                    type="text"
                    name="reason"
                    value={reason}
                    placeholder="Buy A Computer"
                    onChange={handleReasonChange}
                  />
                  {errors.reason && (
                    <div className="text-red-500 font-title text-sm">
                      {errors.reason}
                    </div>
                  )}
                </div>
                <div className="md:flex w-full p-2.5">
                  <div className="mb-2 w-full pr-2">
                    <label className="text-md font-title font-medium ml-5">
                      Target amount
                    </label>
                    <input
                      className="w-full shadow-inner font-title p-4 rounded-lg border-0 focus:outline-red-500"
                      type="number"
                      name="Target amount"
                      placeholder="237650"
                      value={target}
                      onChange={handleTargetAmountChange}
                    />
                    {errors.target && (
                      <div className="text-red-500 font-title text-sm">
                        {errors.target}
                      </div>
                    )}
                  </div>
                  <div className="mb-2 w-full px-2">
                    <label className="text-md font-title font-medium ml-5">
                      Starting Date
                    </label>
                    <input
                      className="w-full shadow-inner p-4 rounded-lg border-0 bg-white font-title focus:outline-red-500"
                      type="date"
                      name="startDate"
                      value={
                        startDate
                          ? startDate.toISOString().substring(0, 10)
                          : ""
                      }
                      onChange={handleStartDateChange}
                    />
                    {errors.startDate && (
                      <div className="text-red-500 font-title text-sm">
                        {errors.startDate}
                      </div>
                    )}
                  </div>
                  <div className="mb-2 w-full pl-2">
                    <label className="text-md font-title font-medium ml-5">
                      Due date
                    </label>
                    <input
                      className="w-full shadow-inner p-4 rounded-lg border-0 bg-white font-title focus:outline-red-500"
                      type="date"
                      name="dueDate"
                      value={
                        dueDate ? dueDate.toISOString().substring(0, 10) : ""
                      }
                      onChange={handleDueDateChange}
                    />
                    {errors.dueDate && (
                      <div className="text-red-500 font-title text-sm">
                        {errors.dueDate}
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:flex w-full p-2.5">
                  <div className="w-full pr-2">
                    <label className="text-md font-title font-medium ml-5">
                      Frequent amount
                    </label>
                    <input
                      className="w-full shadow-inner font-title p-4 rounded-lg border-0 focus:outline-red-500"
                      type="number"
                      name="Frequent amount"
                      placeholder="237650"
                      value={frequentAmount}
                      onChange={handleFrequentAmountChange}
                    />
                    {errors.frequentAmount && (
                      <div className="text-red-500 font-title text-sm">
                        {errors.frequentAmount}
                      </div>
                    )}
                  </div>
                  <div className="w-full pl-2">
                    <label
                      htmlFor="frequency"
                      className="text-md font-title font-medium ml-5"
                    >
                      Frequency
                    </label>
                    <select
                      id="frequency"
                      className="w-full shadow-inner p-4 rounded-lg border-0 font-title bg-white focus:outline-red-500"
                      onChange={handleFrequencyChange}
                    >
                      <option value="">Choose your frequency</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.selectedDates && (
                      <div className="text-red-500 font-title text-sm">
                        {errors.selectedDates}
                      </div>
                    )}
                  </div>
                </div>

                {isOtherSelected && (
                  <div className="md:flex w-full p-2.5">
                    <div className="w-full pr-2">
                      <label
                        htmlFor="customFrequencyType"
                        className="text-md font-title font-medium ml-5"
                      >
                        Custom Frequency Type
                      </label>
                      <select
                        id="customFrequencyType"
                        className="w-full shadow-inner p-4 rounded-lg border-0 font-title bg-white focus:outline-red-500"
                        value={customFrequencyType}
                        onChange={(e) => setCustomFrequencyType(e.target.value)}
                      >
                        <option value="">Select Type</option>
                        <option value="Day">Day</option>
                        <option value="Week">Week</option>
                        <option value="Month">Month</option>
                        <option value="Year">Year</option>
                      </select>
                    </div>
                    <div className="w-full pl-2">
                      <label
                        htmlFor="customFrequency"
                        className="text-md font-title font-medium ml-5"
                      >
                        Custom Frequency
                      </label>
                      <input
                        id="customFrequency"
                        className="w-full shadow-inner font-title p-4 rounded-lg border-0 focus:outline-red-500"
                        type="number"
                        value={customFrequency ? customFrequency : 0}
                        onChange={(e) =>
                          setCustomFrequency(parseInt(e.target.value))
                        }
                      />
                    </div>
                  </div>
                )}
                <div className="w-full p-2.5">
                  <label className="text-md font-title font-medium ml-5">
                    Selected Dates
                  </label>
                  <div className="flex flex-wrap">
                    {selectedDates.map((date) => (
                      <div
                        key={date.toISOString()}
                        className="bg-blue-500 text-white p-2 font-title rounded-lg m-1"
                      >
                        {format(date, "MM/dd/yyyy")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden md:contents">
          <Calendar
            onDateSelect={handleDateSelect}
            selectedDates={selectedDates}
          />
        </div>
      </div>
      <div className="w-full h-fit z-20">
        <BottomNavigation />
      </div>
      {startDate && dueDate && selectedDates.length !== 0 && isDecimal && (
        <div
          className={`absolute z-20 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 ${
            isDecimal ? "opacity-100" : "opacity-0"
          } transition duration-300 ease-in-out`}
        >
          <div
            className={`bg-white h-fit font-title mx-auto relative max-w-sm overflow-hidden md:max-w-5xl rounded-md p-4 w-full ${
              isDecimal ? "cale-100" : "cale-50"
            } transition flex flex-col duration-300 ease-in-out`}
          >
            <div className="flex justify-between mb-8">
              <h1 className="text-2xl font-title font-semibold">Finish Type</h1>
              <div
                className="cursor-pointer"
                onClick={() => setIsDecimal(false)}
              >
                <XMarkIcon className="h-8 w-8" />
              </div>
            </div>
            <p className="text-base mb-3">
              The last contribution date is before the deadline. Choose{" "}
              <span className="font-semibold">Early Finish</span> to finish
              before the deadline or{" "}
              <span className="font-semibold">Late Finish</span> to extend the
              deadline to match the last contribution date. <br />{" "}
              <span className="font-light text-sm">
                You can also close this box and change the deadline at your
                please
              </span>
            </p>
            <div className="w-full h-full flex p-2.5 space-x-3">
              <div
                className="w-full text-white text-center py-20 bg-[#BB0A01] rounded-md cursor-pointer   "
                onClick={() => {
                  setFinishType("early");
                  setIsDecimal(false);
                }}
              >
                Early Finish
              </div>
              <div
                className="w-full text-white text-center py-20 bg-[#BB0A01] rounded-md cursor-pointer"
                onClick={() => {
                  setFinishType("late");
                  setIsDecimal(false);
                }}
              >
                Late Finish
              </div>
            </div>
          </div>
        </div>
      )}
      {preview && (
        <div
          className={`absolute z-20 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 ${
            preview ? "opacity-100" : "opacity-0"
          } transition duration-300 ease-in-out`}
        >
          <div
            className={`bg-white h-fit font-title mx-auto relative max-w-sm overflow-hidden md:max-w-5xl rounded-md p-4 w-full ${
              isDecimal ? "cale-100" : "cale-50"
            } transition flex flex-col duration-300 ease-in-out`}
          >
            <div className="flex justify-between mb-8">
              <h1 className="text-2xl font-title font-semibold">
                Preview & Save
              </h1>
              <div className="cursor-pointer" onClick={() => setPreview(false)}>
                <XMarkIcon className="h-8 w-8" />
              </div>
            </div>
            <p className="text-sm mb-5">
              You are about to create a new plan with the following details:
            </p>
            <div className="flex flex-wrap mb-6 overflow-y-auto">
              <div className="w-full p-2.5">
                <label className="text-md font-title font-medium ml-5">
                  Plan Reason
                </label>
                <input
                  className="w-full shadow-inner font-title p-4 rounded-lg border-0 focus:outline-red-500"
                  type="text"
                  name="reason"
                  value={reason}
                />
              </div>
              <div className="md:flex w-full p-2.5">
                <div className="w-full pr-2">
                  <label className="text-md font-title font-medium ml-5">
                    Target
                  </label>
                  <input
                    className="w-full shadow-inner font-title p-4 rounded-lg border-0 focus:outline-red-500"
                    type="text"
                    name="target"
                    value={target}
                  />
                </div>
                <div className="w-full pl-2">
                  <label className="text-md font-title font-medium ml-5">
                    Frequent Amount
                  </label>
                  <input
                    className="w-full shadow-inner font-title p-4 rounded-lg border-0 focus:outline-red-500"
                    type="text"
                    name="frequent"
                    value={frequentAmount}
                  />
                </div>
              </div>
              <div className="md:flex w-full p-2.5">
                <div className="mb-2 w-full pr-2">
                  <label className="text-md font-title font-medium ml-5">
                    Starting Date
                  </label>
                  <input
                    className="w-full shadow-inner p-4 rounded-lg border-0 bg-white font-title focus:outline-red-500"
                    type="date"
                    name="startDate"
                    value={
                      startDate ? startDate.toISOString().substring(0, 10) : ""
                    }
                  />
                </div>
                <div className="mb-2 w-full pl-2">
                  <label className="text-md font-title font-medium ml-5">
                    Due date
                  </label>
                  <input
                    className="w-full shadow-inner p-4 rounded-lg border-0 bg-white font-title focus:outline-red-500"
                    type="date"
                    name="dueDate"
                    value={
                      dueDate ? dueDate.toISOString().substring(0, 10) : ""
                    }
                  />
                </div>
              </div>
              <div className="w-full p-2.5">
                <label className="text-md font-title font-medium ml-5">
                  Selected Dates
                </label>
                <div className="flex flex-wrap">
                  {selectedDates.map((date) => (
                    <div
                      key={date.toISOString()}
                      className="bg-blue-500 text-white p-2 font-title rounded-lg m-1"
                    >
                      {format(date, "MM/dd/yyyy")}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full bg-white flex justify-between absolute bottom-0 pr-5">
              <div className="py-2.5 px-10">
                <input
                  type="checkbox"
                  name=""
                  id="usagecondition"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label htmlFor="usagecondition" className="text-sm">
                  {" "}
                  I accept and agree to the Terms of Use
                </label>
              </div>
              <div
                className={`mr-5 mb-2 md:py-3 py-6 px-10 bg-[#BB0A01] rounded-full w-fit h-5 md:h-12 text-nowrap text-white font-title ${
                  isChecked ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                } cursor-pointer`}
                onClick={isChecked ? submitForm : undefined}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePlan;
