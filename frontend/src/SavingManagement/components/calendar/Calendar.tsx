import React, { useState } from "react";
import {
  format,
  startOfToday,
  parse,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  endOfMonth,
  getDay,
  isSameDay,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface CalendarProps {
  selectedDates: Date[];
  onDateSelect: (date: Date) => void;
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

const Calendar: React.FC<CalendarProps> = ({ selectedDates, onDateSelect }) => {
  const today = startOfToday();
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: endOfMonth(firstDayOfMonth),
  });

  const getPrevMonth = () => {
    const prevMonth = parse(currMonth, "MMM-yyyy", new Date());
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrMonth(format(prevMonth, "MMM-yyyy"));
  };

  const getNextMonth = () => {
    const nextMonth = parse(currMonth, "MMM-yyyy", new Date());
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrMonth(format(nextMonth, "MMM-yyyy"));
  };
  return (
    <div className="p-8">
      <div className="flex flex-row items-center justify-between">
        <p className="font-semibold flex-auto text-xl">
          {format(firstDayOfMonth, "MMMM yyyy")}
        </p>
        <div className="flex items-center justify-evenly gap-2 md:gap-5">
          <ChevronLeftIcon
            className="w-6 h-6 cursor-pointer"
            onClick={getPrevMonth}
          />
          <ChevronRightIcon
            className="w-6 h-6 cursor-pointer"
            onClick={getNextMonth}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 leading-6 gap-2 mt-8 md:gap-5 place-items-center">
        {days.map((day, i) => {
          return (
            <div key={i} className="font-semibold">
              {day}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 gap-2 md:gap-5 mt-8 place-items-center">
        {daysInMonth.map((day: any, i: any) => {
          const isSelected = selectedDates.some((date) => isSameDay(day, date));
          return (
            <div key={i} className={colStartClasses[getDay(day)]}>
              <p
                className={`cursor-pointer flex items-center justify-center font-semibold h-8 w-8 rounded-full hover:text-white ${
                  isSameMonth(day, today) ? "text-gray-900" : "text-gray-400"
                }${!isToday(day) && "hover:bg-blue-500"} ${
                  isToday(day) && "bg-red-500 text-white"
                } ${isSelected && "bg-blue-800 text-white"}`}
                onClick={() => onDateSelect(day)}
              >
                {format(day, "d")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
