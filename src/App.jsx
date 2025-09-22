import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video.jsx'
// import Sidebar from './Components/Sidebar/Sidebar.jsx'

const App = () => {

  const [sideBar, setSidebar]= useState(false);

  return (
    <>
      <Navbar setsidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sideBar} setsidebar={setSidebar}/>} />
        <Route path='/video/:categoryID/:videoID' element={<Video sidebar={sideBar}/>} />
      </Routes>
    </>
  )
}

export default App