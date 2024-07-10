import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './views/Login/Login'
import Register from './views/Register/Register'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />;
          <Route path="/register" element={<Register />} />;
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
