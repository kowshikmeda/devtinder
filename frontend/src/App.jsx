import React from 'react'
import Login from './components/Login'
import Profile from './components/Profile'
import {BrowserRouter,Routes,Route }from 'react-router-dom'
import Body from './components/Body'
const App = () => {
  return (
    <>
    
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
         <Route path='/login' element={<Login/>}/>
         <Route path='/profile' element={<Profile/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
     
    
     </>
  
  )
}

export default App