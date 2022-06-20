import './App.css'
import Airdrop from './components/Airdrop'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Election from './components/Election'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Election />} />
        <Route path="/Airdrop" element={<Airdrop />} />
      </Routes>
    </>
  )
}

export default App
