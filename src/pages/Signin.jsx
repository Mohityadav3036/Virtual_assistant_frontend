import React, { useContext } from 'react'
import bgimage from '../assets/bgimage.jpg'
import {IoEye,IoEyeOff} from 'react-icons/io5'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/userContext'
import axios from 'axios'
function Signin() {

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("");
  const [loading, setLoading] = useState(false);

 const {serverUrl,userData,setUserData} = useContext(userDataContext)
 const [ error,setError] = useState("")
      const handleSignin = async(e)=> {
        e.preventDefault()
        setLoading(true)
        setError("");
               try {
                  let result = await axios.post(`${serverUrl}/api/auth/signin`,{
                    email,password
                  },{withCredentials:true})
                  console.log("result->",result.data)
                setUserData(result.data)
                console.log("data mohit->",userData)
                  setLoading(false)
                   navigate("/")
               } catch (error) {
                   console.log(error)
                   setUserData(null)
                   setLoading(false)
                   setError(error.response.data.message)
                   
               }
      }





  return (
    <div className='w-full h-[100vh]  bg-cover flex justify-center items-center' style={{backgroundImage:`url(${bgimage})`}}>
    
          <form className=' w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] p-[20px]' onSubmit={handleSignin}>
          <h1 className=' text-white text-[30px] font-semibold mb-[30px]'>Welcome to <span className=' text-blue-950 '>Virtual Assistant</span></h1>
                         

                   <input type=' email' placeholder='Enter your email' className=' w-full h-[60px] text-xl outline-none border-2 border-white rounded-xl bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px]' required onChange={(e)=>setEmail(e.target.value)} value={email} />

                     <div className=' w-full h-[60px] border-2 border-white  bg-transparent text-white rounded-xl text-xl relative'>
                          <input type={showPassword?"text":"password"} placeholder='Enter your Password' className=' w-full h-full rounded-xl outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px] ' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
                          {!showPassword &&  <IoEye className=' absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer' onClick={()=>setShowPassword(true)}/>  
                          }

                           {showPassword &&  <IoEyeOff className=' absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white]  cursor-pointer ' onClick={()=>setShowPassword(false)}/>  
                          }
                         

                     </div>
  
                         {error.length>0 && <p className='text-red-500 '>
                          {error}
                         </p>}
                   

                   <button type='submit'  className=' mt-[30px] min-w-[150px] bg-white h-[60px] rounded-xl text-xl text-black font-semibold' disabled={loading}>{loading?"Loading...":"Sign In"}</button>

              <p className=' text-white'>Don't have an account <span className=' text-blue-300 cursor-pointer' onClick={()=>navigate("/signup")}>Sign Up</span></p>



                          
          </form>

    </div>
  )
}

export default Signin
