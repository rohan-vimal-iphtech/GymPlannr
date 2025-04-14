import React, { useState, useMemo, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveDateWithInit } from '../redux/plannerSlice';
import { getWeekDates } from './dateUtils';

const formatDateLabel = (dateStr) => {
  const options = { weekday: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const DayTabs = ({ isCalShow, isFlipped, calendarBtnRef, calendarRef, setIsCalShow, setIgnoreNextOutsideClick }) => {
  const dispatch = useDispatch();
  const { activeDate } = useSelector((state) => state.planner);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const weekDates = useMemo(() => getWeekDates(calendarDate), [calendarDate]);

  return (
    <div className="relative inline-block flex pb-1 w-full">
      <div className="w-full">
        <div className="flex gap-2">
          {weekDates.map((dateStr) => (
            <div
              key={dateStr}
              className={`relative rounded-t-lg cursor-pointer flex justify-center items-center h-11 px-4 flex-grow min-w-[80px] transition-all ${
                activeDate === dateStr
                  ? 'font-semibold text-gray-800 bg-white'
                  : 'text-gray-500 bg-gray-200'
              }`}
              onClick={() => dispatch(setActiveDateWithInit(dateStr))}
            >
              {formatDateLabel(dateStr)}
            </div>
          ))}
        </div>
      </div>

      {isCalShow && (
        <div
          className={isFlipped ? 'fixed top-0 right-10 z-50' : 'fixed mr-2 top-0 right-0 z-10'}
          ref={calendarRef}
        >
          <Calendar
            onClickDay={(date) => {
              const newWeek = getWeekDates(date);
              const monday = newWeek[0];
              setCalendarDate(date);
              dispatch(setActiveDateWithInit(monday));

              setIgnoreNextOutsideClick(true); // 👈 prevent next click from closing
              setTimeout(() => {
                setIsCalShow(false);
              }, 0);
            }}
            value={calendarDate}
            locale="en-GB"
          />
        </div>
      )}
    </div>
  );
};

export default DayTabs;
