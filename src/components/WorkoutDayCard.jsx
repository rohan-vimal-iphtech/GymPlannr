import React, { useEffect, useState } from 'react';
import { FaClock, FaDumbbell, FaPlus, FaTrash } from 'react-icons/fa';
import { GoPencil } from "react-icons/go";
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {
    addDay,
    editDayTitle,
    toggleRestDay,
    setActiveDate,
    removeExerciseFromDay,
    removeDay,
    editExerciseField,
    reorderExercisesInDay,
} from '../redux/plannerSlice';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import muscleImages from './exerciseData';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };
    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            {children({ listeners })}
        </div>
    );
};

const WorkoutDayCard = ({ onFlipLayout, isFlipped, date }) => {
    const dispatch = useDispatch();
    const { days, activeDate } = useSelector((state) => state.planner);
    const activeDay = days[activeDate];
    const [isEditing, setIsEditing] = useState(false);

    // ✅ HOOKS must be called unconditionally
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );


    useEffect(() => {
        const today = dayjs().format('YYYY-MM-DD');
        dispatch(addDay(today));
        dispatch(setActiveDate(today));
    }, []);

    useEffect(() => {
        const localData = localStorage.getItem('plannerState');
        if (localData) {
            const parsed = JSON.parse(localData);
            if (parsed?.activeDate && parsed?.daysByDate) {
                dispatch(setActiveDate(parsed.activeDate));
            }
        }
    }, [dispatch]);

    if (!activeDay) return null;

    const handleTitleChange = (e) => {
        dispatch(editDayTitle({ date: activeDate, title: e.target.value }));
    };

    const handleRemoveExercise = (exerciseIndex) => {
        dispatch(removeExerciseFromDay({ date: activeDate, exerciseIndex }));
    };

    const calculateEstimatedTime = () => {
        if (!activeDay?.exercises?.length) return 0;
        let totalSeconds = 0;
        activeDay.exercises.forEach((ex) => {
            const setTime = ex.sets * 120;
            const restTime = (ex.sets - 1) * (ex.restTime || 0);
            totalSeconds += setTime + restTime;
        });
        return Math.ceil(totalSeconds / 60);
    };

    // ✅ Show loading until state is ready
    if (!activeDate || !activeDay) {
        return (
            <div className="w-full p-6 text-center text-gray-500">
                Loading workout plan...
            </div>
        );
    }


    return (
        <div className="w-full bg-white shadow rounded-lg p-4 flex flex-col gap-4 h-130 overflow-hidden">
            {/* Title */}
            <div className="flex justify-between gap-2 mb-2">
                {isEditing ? (
                    <input
                        type="text"
                        value={activeDay.title}
                        onChange={handleTitleChange}
                        onBlur={() => setIsEditing(false)}
                        autoFocus
                        className="text-lg font-semibold border border-sky-300 rounded-md outline-none px-2 py-1"
                    />
                ) : (
                    <>
                        <span className='flex gap-2'><h2 className="text-xl font-semibold">{activeDay.title}</h2>
                            <button className="text-sky-500" onClick={() => setIsEditing(true)}>
                                <GoPencil size={22} />
                            </button></span>
                    </>
                )}
                <button
                    onClick={onFlipLayout}
                    className="flex items-center gap-2 border px-4 py-1 rounded text-sm hover:bg-gray-100"
                >
                    {!isFlipped ? (
                        <> <FaPlus /> Add Exercise </>
                    ) : (
                        <> <MdOutlineDashboardCustomize /> Plan Overview </>
                    )}
                </button>
            </div>

            {/* Info */}
            <div className="flex items-center text-sm text-gray-500 gap-4 mb-4">
                <div className="flex items-center gap-1">
                    <FaClock className='text-sky-500' />
                    <span className='text-md'>Est time: {calculateEstimatedTime()} min</span>
                </div>
                <div className="flex items-center gap-1">
                    <FaDumbbell className='text-sky-500' />
                    <span className='text-md'>{activeDay.exercises.length} exercises</span>
                </div>
                <div className="flex items-center gap-1">
                    <span>Rest Day</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={activeDay.isRestDay}
                            onChange={() => dispatch(toggleRestDay(activeDate))}
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                    </label>
                </div>
            </div>

            {/* Controls */}
            {/* <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <button onClick={() => dispatch(removeDay(activeDate))} className="flex items-center gap-1">
                        <FaTrash /> Delete
                    </button>
                    <div className="flex items-center gap-1">
                        <span>Rest Day</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={activeDay.isRestDay}
                                onChange={() => dispatch(toggleRestDay(activeDate))}
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                        </label>
                    </div>
                </div>
                <button
                    onClick={onFlipLayout}
                    className="flex items-center gap-2 border px-4 py-1 rounded text-sm hover:bg-gray-100"
                >
                    {!isFlipped ? (
                        <> <FaPlus /> Add Exercise </>
                    ) : (
                        <> <MdOutlineDashboardCustomize /> Plan Overview </>
                    )}
                </button>
            </div> */}


            {activeDay.exercises.length === 0 && (
                <div className="text-center text-gray-400 mt-16">
                    <div className="flex justify-center mb-2">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">📋</div>
                    </div>
                    <p className="font-semibold">No exercises</p>
                    <p className="text-sm">Start building your workout</p>
                </div>
            )}

            {/* Exercises List */}
            {activeDay.exercises.length > 0 && (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={({ active, over }) => {
                        if (active.id !== over?.id) {
                            const oldIndex = activeDay.exercises.findIndex(ex => ex.id === active.id);
                            const newIndex = activeDay.exercises.findIndex(ex => ex.id === over.id);

                            dispatch(reorderExercisesInDay({
                                date: activeDate,
                                oldIndex,
                                newIndex
                            }));
                        }
                    }}
                >
                    <SortableContext
                        items={activeDay.exercises.map(ex => ex.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="max-h-[500px] overflow-y-auto pr-2 custom-scroll">
                            {activeDay.exercises.map((ex, i) => (
                                <SortableItem key={ex.id} id={ex.id}>
                                    {({ listeners }) => (
                                        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 border-b pb-4 mb-4">
                                            <div className="text-gray-400 cursor-grab" {...listeners}>⋮⋮</div>
                                            {(() => {
                                                const imageObj = muscleImages.find(m => m.name === ex.muscle);
                                                return (
                                                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                                        {imageObj ? (
                                                            <img src={imageObj.image} alt={ex.muscle} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <img src={ex.gifUrl} alt={ex.name} className="w-full h-full object-cover" />
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium capitalize">{ex.name}</p>
                                                    <span className="text-xs bg-sky-100 text-sky-400 px-2 py-0.5 rounded">{ex.muscle}</span>
                                                    {ex.linked && (
                                                        <span className="text-xs text-gray-500 flex items-center gap-1 ml-2">
                                                            <span className="inline-block w-3 h-3 bg-gray-400 rounded-full" />
                                                            Link above
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-4 gap-2 mt-2 text-center text-sm">
                                                    {['sets', 'reps', 'interval', 'restTime'].map((field) => (
                                                        <div key={field}>
                                                            <div className="text-gray-400 capitalize">{field.replace(/([A-Z])/g, ' $1')}</div>
                                                            {(field === 'interval' || field === 'restTime') ? (
                                                                <input
                                                                    type="text"
                                                                    className="w-20 px-2 py-1 border border-gray-300 bg-gray-100 rounded text-center text-sm"
                                                                    value={
                                                                        String(Math.floor(ex[field] / 60)).padStart(2, '0') +
                                                                        ':' +
                                                                        String(ex[field] % 60).padStart(2, '0')
                                                                    }
                                                                    onChange={(e) => {
                                                                        const [minStr, secStr] = e.target.value.split(':');
                                                                        const minutes = parseInt(minStr) || 0;
                                                                        const seconds = parseInt(secStr) || 0;
                                                                        const totalSeconds = minutes * 60 + seconds;
                                                                        dispatch(editExerciseField({
                                                                            date: activeDate,
                                                                            exerciseIndex: i,
                                                                            field,
                                                                            value: totalSeconds,
                                                                        }));
                                                                    }}
                                                                    placeholder="00:00"
                                                                />
                                                            ) : (
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    className="w-20 pl-4 py-1 border border-gray-300 bg-gray-100 rounded text-center text-sm"
                                                                    value={ex[field]}
                                                                    onChange={(e) =>
                                                                        dispatch(editExerciseField({
                                                                            date: activeDate,
                                                                            exerciseIndex: i,
                                                                            field,
                                                                            value: parseInt(e.target.value) || 0,
                                                                        }))
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveExercise(i)}
                                                className="text-gray-400 hover:text-red-500 absolute top-14 right-1"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )}
                                </SortableItem>
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </div>
    );
};

export default WorkoutDayCard;
