import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FrontPage from './components/FrontPage'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import { DndContext } from '@dnd-kit/core';
function App() {


  return (
    <>
      <DndContext>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </DndContext>
    </>
  )
}

export default App
