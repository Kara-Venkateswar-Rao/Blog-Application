import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import AddBlog from './pages/AddBlog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>} />
        <Route path={'/addblog'} element={<AddBlog/>} />
      </Routes>
    </div>
  )
}

export default App
