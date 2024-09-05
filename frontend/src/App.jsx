import './App.css'
import { Login } from './components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Profile from './components/Profile';
import Register from './components/Register';

function App() {


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Login />} path='/login' />
        <Route element={<Profile />} path='/profile' />
        <Route element={<Register />} path='/register' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
