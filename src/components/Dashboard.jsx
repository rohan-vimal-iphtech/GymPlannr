import React, { useState, useMemo, useEffect, useRef } from 'react'
import CreateRoutine from './CreateRoutine'
import WorkoutDayCard from './WorkoutDayCard'
import Exercises from './Exercises'
import DayTabs from './DayTabs'
import WeeklyReport from './WeeklyReport';
import { useSelector, useDispatch } from 'react-redux';
import { getWeekDates } from './dateUtils';
import { setActiveDate, addDay } from '../redux/plannerSlice';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const calendarBtnRef = useRef(null);
    const calendarRef = useRef(null);

    const [isFlipped, setIsFlipped] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [isCalShow, setIsCalShow] = useState(false);
    const [ignoreNextOutsideClick, setIgnoreNextOutsideClick] = useState(false);


    const [calendarDate] = useState(new Date());
    const weekDates = useMemo(() => getWeekDates(calendarDate), [calendarDate]);
    const { days, activeDate } = useSelector((state) => state.planner);
    useEffect(() => {
        const missingDates = weekDates.filter(date => !days[date]);
        if (missingDates.length > 0) {
            missingDates.forEach(date => dispatch(addDay(date)));
        }
    }, [dispatch, weekDates.join(','), Object.keys(days).join(',')]);

    const handleFlipLayout = () => {
        setIsFlipped(!isFlipped);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ignoreNextOutsideClick) {
                setIgnoreNextOutsideClick(false);
                return;
            }

            if (
                calendarRef.current &&
                !calendarRef.current.contains(e.target) &&
                calendarBtnRef.current &&
                !calendarBtnRef.current.contains(e.target)
            ) {
                setIsCalShow(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [ignoreNextOutsideClick]);


    return (
        <div className="bg-gray-100 h-screen flex flex-col overflow-hidden">
            <div className='p-4'>
                <p className='text-sky-500 text-5xl bold font-semibold pl-4 ' onClick={()=> navigate('/')}>GymPlanr</p>
                <p className='bold text-2xl pl-4 pt-2'>Routine Builder - Your workout planner online</p>

                <div className='w-full flex justify-between items-center'>
                    <p className='text-gray-400 pl-4'>Create, collaborate, and share workout programs with the GymPlanr workout planner online.</p>
                    <div>
                        <button
                            ref={calendarBtnRef}
                            className='mr-1 border border-blue-500 bg-sky-500 p-1 rounded-sm text-white'
                            onClick={() => setIsCalShow(!isCalShow)}
                        >
                            Calendar
                        </button>
                        <button className='mr-1 border border-blue-500 bg-sky-500 p-1 rounded-sm text-white' onClick={() => setShowReport(true)}>Weekly Report</button>
                    </div>
                </div>
            </div>

            <div className="relative w-full flex-1 pb-8">
                {/* Front Side (CreateRoutine) */}
                <div
                    className={`absolute p-2 top-0 left-0 w-full h-full flex gap-2 transition-all duration-500 ease-linear ${isFlipped ? 'opacity-0 -translate-x-10 pointer-events-none' : 'opacity-100 translate-x-0'
                        }`}
                >
                    <div className="w-[30%]">
                        <CreateRoutine />
                    </div>
                    <div className="w-[70%] flex flex-col gap-2">
                        <DayTabs
                            isCalShow={isCalShow}
                            isFlipped={isFlipped}
                            calendarBtnRef={calendarBtnRef}
                            calendarRef={calendarRef}
                            setIsCalShow={setIsCalShow}
                            setIgnoreNextOutsideClick={setIgnoreNextOutsideClick}
                        />

                        {days[activeDate] && (
                            <WorkoutDayCard date={activeDate} onFlipLayout={handleFlipLayout} />
                        )}
                    </div>
                </div>

                {/* Back Side (Exercises) */}
                <div
                    className={`absolute p-2 top-0 left-0 w-full h-full flex gap-2 transition-all duration-500 ease-linear ${isFlipped ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
                        }`}
                >
                    <div className="w-[70%] flex flex-col  gap-2">
                        <DayTabs
                            isCalShow={isCalShow}
                            isFlipped={isFlipped}
                            calendarBtnRef={calendarBtnRef}
                            calendarRef={calendarRef}
                            setIsCalShow={setIsCalShow}
                            setIgnoreNextOutsideClick={setIgnoreNextOutsideClick}
                        />

                        <WorkoutDayCard onFlipLayout={handleFlipLayout} isFlipped />
                    </div>
                    <div className="w-[30%]">
                        <Exercises />
                    </div>
                </div>
            </div>

            {showReport && <WeeklyReport onClose={() => setShowReport(false)} />}
        </div>
    )
}

export default Dashboard