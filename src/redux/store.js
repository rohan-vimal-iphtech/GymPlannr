// store.js
import { configureStore } from '@reduxjs/toolkit';
import plannerReducer from './plannerSlice';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('plannerState');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Could not load state', e);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('plannerState', serializedState);
  } catch (e) {
    console.error('Could not save state', e);
  }
};

const store = configureStore({
  reducer: {
    planner: plannerReducer
  },
  preloadedState: {
    planner: loadState(), // This ensures your state loads!
  }
});

// Subscribe to store changes
store.subscribe(() => {
  saveState(store.getState().planner);
});

export default store;
