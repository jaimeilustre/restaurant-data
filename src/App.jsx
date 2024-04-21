import './App.css'
import { Route, Routes } from 'react-router-dom'
import RestaurantListPage from './pages/RestaurantListPage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'

function App() {

  return (
    <>

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants/:postcode" element={<RestaurantListPage />} />
      </Routes>
    </>
  )
}

export default App
