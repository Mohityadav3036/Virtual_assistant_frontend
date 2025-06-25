import React, { useContext } from 'react'
import  {Router,Route,Routes, Navigate} from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import Customize from './pages/Customize.jsx'
import Home from './pages/Home.jsx'
import { userDataContext } from './context/UserContext.jsx'
import Customize2 from './pages/Customize2.jsx'
function App() {
 const {userData,setUserData} = useContext(userDataContext)
  // const userData = "a";

  return (
    <>
     <Routes>
      <Route path='/' element={(userData?.assistantImage && userData?.assistantName)?<Home/> : <Navigate to={"/customize"}/>}/>
      <Route path='/signup' element={!userData?<Signup/>:<Navigate to={"/"}/>}/>
      <Route path='/signin' element={!userData?<Signin/>:<Navigate to={"/"}/>}/>
      <Route path='/customize' element={userData?<Customize/>:<Navigate to={"/signup"}/>}/>
      <Route path='/customize2' element={userData?<Customize2/>:<Navigate to={"/signup"}/>}/>

     </Routes>

     </>
   
      )
}

export default App
