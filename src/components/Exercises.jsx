import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addExerciseToDay } from '../redux/plannerSlice';
import muscleImages from './exerciseData';
const Exercises = () => {
  const [search, setSearch] = useState('');
  const [muscles, setMuscles] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const activeDate = useSelector((state) => state.planner.activeDate);

  // Load all unique muscles and equipment on mount
  useEffect(() => {
    const fetchAllExercises = async () => {
      try {
        const res = await axios.get('https://api.api-ninjas.com/v1/exercises?limit=100', {
          headers: {
            'X-Api-Key': 'cUnoKeWTFOz7XXfKbmH4WQ==pxHJRuQ3P3WSwY3o'
          }
        });

        const data = res.data;
        const uniqueMuscles = [...new Set(data.map(ex => ex.muscle))].sort();
        const uniqueEquipments = [...new Set(data.map(ex => ex.equipment))].sort();
        setMuscles(uniqueMuscles);
        setEquipments(uniqueEquipments);
      } catch (error) {
        console.error('Error loading filters:', error);
      }
    };

    fetchAllExercises();
  }, []);

  // Fetch filtered exercises
  useEffect(() => {
    const fetchFilteredExercises = async () => {
      setLoading(true);
      try {
        let url = 'https://api.api-ninjas.com/v1/exercises?';
        if (selectedMuscle) url += `muscle=${selectedMuscle}&`;
        if (selectedEquipment) url += `equipment=${selectedEquipment}`;

        const res = await axios.get(url, {
          headers: {
            'X-Api-Key': 'cUnoKeWTFOz7XXfKbmH4WQ==pxHJRuQ3P3WSwY3o'
          }
        });

        setExercises(res.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedMuscle || selectedEquipment) {
      fetchFilteredExercises();
    } else {
      setExercises([]);
    }
  }, [selectedMuscle, selectedEquipment]);

  const filteredExercises = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" bg-white rounded-lg shadow-md p-4 h-138">
      <h2 className="text-xl font-semibold mb-4">Exercise Library</h2>

      {/* Dropdown Filters */}
      <div className="flex gap-2 mb-4">
        <select
          className="w-1/2 border p-2 rounded text-sm"
          value={selectedMuscle}
          onChange={(e) => {
            setSelectedMuscle(e.target.value);
            
            setSelectedEquipment('');
          }}
        >
          <option value="">Select Muscle</option>
          {muscles.map((muscle, i) => (
            <option key={i} value={muscle}>{muscle}</option>
          ))}
        </select>

        <select
          className="w-1/2 border p-2 rounded text-sm"
          value={selectedEquipment}
          onChange={(e) => {
            setSelectedEquipment(e.target.value);
            setSelectedMuscle('');
          }}
        >
          <option value="">Select Equipment</option>
          {equipments.map((eq, i) => (
            <option key={i} value={eq}>{eq}</option>
          ))}
        </select>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search exercise name"
        className="w-full border rounded p-2 text-sm mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3 className="text-sm font-semibold mb-2">Exercises</h3>

      {/* Exercise Cards */}
      {loading ? (
        <p>Loading exercises...</p>
      ) : filteredExercises.length > 0 ? (
        <div className="flex flex-col gap-3 h-88 overflow-y-auto custom-scroll">
          {filteredExercises.map((ex, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedMuscle(ex.muscle);
                setSelectedEquipment('');
              }}
            >
              {/* <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold uppercase">
                {ex.name.slice(0, 2)}
              </div> */}
              {(() => {
                const imageObj = muscleImages.find(m => m.name === ex.muscle);
                return (
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {imageObj ? (
                      <img src={imageObj.image} alt={ex.muscle} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-bold uppercase">{ex.name.slice(0, 2)}</span>
                    )}
                  </div>
                );
              })()}
              <div className="flex-1">
                <p className="font-medium capitalize">{ex.name}</p>
                <p className="text-xs text-gray-500">{ex.muscle}</p>
              </div>
              <button
                className="text-sky-500 hover:text-sky-700"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addExerciseToDay({
                    date: activeDate,
                    exercise: {
                      ...ex,
                      id: Date.now(), // ← optional: to uniquely identify for drag-and-drop
                      sets: 3,
                      reps: 10,
                      interval: 60,
                      restTime: 60,
                      linked: false,
                    },
                  }));
                }}
              >
                <FaPlus />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No exercises found.</p>
      )}
    </div>
  );
};

export default Exercises;
