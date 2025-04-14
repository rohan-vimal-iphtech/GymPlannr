import React, { useState, useRef } from 'react'
import { updatePlan } from '../redux/plannerSlice';
import { useSelector, useDispatch } from 'react-redux';
const CreateRoutine = () => {
    const dispatch = useDispatch();
    const savedPlan = useSelector((state) => state.planner.plan);
   
    const [planName, setPlanName] = useState(savedPlan.planName || 'New Plan');
    const [selectedFocus, setSelectedFocus] = useState(savedPlan.focus || 'Maintaining');
    const [selectedLevel, setSelectedLevel] = useState(savedPlan.level || 'Beginner');
    const [selectedDayTag, setSelectedDayTag] = useState(savedPlan.dayTag || 'Weekday');
    const [description, setDescription] = useState(savedPlan.description || '');

    const options = ['Maintaining', 'Bulking', 'Cutting', 'Sport Specific'];
    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    const dayTags = ['Weekday', 'Day of week'];

    const savePlanToRedux = () => {
        dispatch(updatePlan({
            id: 1, // or Date.now() if you want
            planName,
            focus: selectedFocus,
            level: selectedLevel,
            dayTag: selectedDayTag,
            description,
        }));
    };


    const handleBlur = () => {
        // You could debounce this if needed
        savePlanToRedux();
    };
    return (

        <div className="h-160 mx-auto px-4 rounded-lg overflow-y-auto custom-scroll">

            {/* <img
                src="https://marketplace.canva.com/EAE9i0KZqn4/1/0/1131w/canva-black-modern-gym-fitness-%28poster%29-0lClEU7P8H4.jpg"
                alt="Workout"
                className="w-full h-60 object-cover rounded-lg mb-4"
            /> */}


            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Plan Name</label>
                <input
                    type="text"

                    name='plane'
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-sky-300"
                />
            </div>


            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Focus</label>
                <div className="flex flex-wrap gap-2">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => { setSelectedFocus(option); dispatch(updatePlan({ focus: option })); }}
                            className={`px-4 py-1 rounded-full transition-colors duration-200 ${selectedFocus === option
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-black hover:bg-gray-200'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Level</label>
                <div className="flex flex-wrap gap-2">
                    {levels.map((level) => (
                        <button
                            key={level}
                            onClick={() => { setSelectedLevel(level);  dispatch(updatePlan({ level })); }}
                            className={`px-4 py-1 rounded-full transition-colors duration-200 ${selectedLevel === level
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-black hover:bg-gray-200'
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Day Tag</label>
                <div className="flex gap-2">
                    {dayTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => {
                                setSelectedDayTag(tag);
                                dispatch(updatePlan({ dayTag: tag }));
                            }}
                            className={`px-4 py-1 rounded-full transition-colors duration-200 ${selectedDayTag === tag
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-black hover:bg-gray-200'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Plan Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={handleBlur}
                    placeholder="Add workout plan description"
                    className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-sky-300"
                    rows={7}
                />
            </div>
        </div>
    );
}

export default CreateRoutine