import { createSlice, nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');

const initialState = {
  plan: {
    id: null,
    planName: '',
    focus: '',
    level: '',
    dayTag: '',
    description: '',
  },
  days: {
    [today]: {
      title: 'New Day',
      exercises: [],
      isRestDay: false,
    },
  },
  activeDate: today,
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    addDay: (state, action) => {
      const date = action.payload;
      if (!state.days[date]) {
        state.days[date] = {
          title: 'New Day',
          exercises: [],
          isRestDay: false,
        };
      }
    },
    removeDay: (state, action) => {
      const date = action.payload;
      delete state.days[date];
      if (state.activeDate === date) {
        const remainingDates = Object.keys(state.days);
        state.activeDate = remainingDates[0] || null;
      }
    },
    setActiveDay: (state, action) => {
      state.activeDate = action.payload;
    },
    setActiveDate: (state, action) => {
      state.activeDate = action.payload;
    },
    editDayTitle: (state, action) => {
      const { date, title } = action.payload;
      if (state.days[date]) {
        state.days[date].title = title;
      }
    },
    toggleRestDay: (state, action) => {
      const date = action.payload;
      if (state.days[date]) {
        state.days[date].isRestDay = !state.days[date].isRestDay;
      }
    },
    addExerciseToDay: (state, action) => {
      const { date, exercise } = action.payload;
      const targetDay = state.days[date];

      if (targetDay) {
        targetDay.exercises.push({
          id: nanoid(),
          ...exercise,
          sets: 3,
          reps: 8,
          interval: 0,
          restTime: 60,
        });
      }
    },
    removeExerciseFromDay: (state, action) => {
      const { date, exerciseIndex } = action.payload;
      if (state.days[date]?.exercises) {
        state.days[date].exercises.splice(exerciseIndex, 1);
      }
    },
    editExerciseField: (state, action) => {
      const { date, exerciseIndex, field, value } = action.payload;
      if (state.days[date]?.exercises?.[exerciseIndex]) {
        state.days[date].exercises[exerciseIndex][field] = value;
      }
    },
    reorderExercisesInDay: (state, action) => {
      const { date, oldIndex, newIndex } = action.payload;
      const exercises = state.days[date]?.exercises;
      if (exercises && exercises[oldIndex]) {
        const [movedItem] = exercises.splice(oldIndex, 1);
        exercises.splice(newIndex, 0, movedItem);
      }
    },
    updatePlan: (state, action) => {
      state.plan = { ...state.plan, ...action.payload };
      localStorage.setItem('plan', JSON.stringify(state.plan));
    },
    setActiveDateWithInit: (state, action) => {
      const date = action.payload;
      state.activeDate = date;
      if (!state.days[date]) {
        state.days[date] = {
          title: 'New Day',
          exercises: [],
          isRestDay: false,
        };
      }
    }
  },
});

export const {
  addDay,
  removeDay,
  setActiveDay,
  setActiveDate,
  editDayTitle,
  toggleRestDay,
  addExerciseToDay,
  removeExerciseFromDay,
  editExerciseField,
  reorderExercisesInDay,
  updatePlan,
  setActiveDateWithInit
} = plannerSlice.actions;

export default plannerSlice.reducer;
