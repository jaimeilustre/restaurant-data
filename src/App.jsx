import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import RestaurantListPage from './pages/RestaurantListPage'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<RestaurantListPage />} />
    </Routes>
    </>
  )
}

export default App
