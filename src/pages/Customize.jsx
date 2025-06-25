import React, { useState,useRef, useContext } from "react"
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"
import image4 from "../assets/image4.jpg"
import image5 from "../assets/image5.jpeg"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpg"
import Card from "../components/Card.jsx"
import { IoIosAdd } from "react-icons/io";
import { userDataContext } from "../context/UserContext.jsx"
import { useNavigate } from "react-router-dom"
import {MdKeyboardBackspace} from "react-icons/md";
function Customize(){
   const {    serverUrl,userData,setUserData,
         backendImage,setBackendImage,
         frontendImage,setFrontendImage,
         selectedImage,setSelectedImage} = useContext(userDataContext)
    const inputImage = useRef()
    const navigate = useNavigate()
    const handleImage = (e) => {
            const file = e.target.files[0]
            setBackendImage(file)
            setFrontendImage(URL.createObjectURL(file))
    }
    return (
        <div className=" w-full h-[100vh] bg-gradient-to-t from-[black] to-[#050569] flex justify-center items-center flex-col relative">

        <MdKeyboardBackspace className=' absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={() => navigate("/") }/>

      <h1 className="text-white text-[30px] text-center p-[20px] ">Select Your <span className=" text-yellow-400"> Assistant Image </span></h1>

        <div className=" w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-[20px] ">
                 <Card image={image1}/>
                 <Card image={image2}/>
                 <Card image={image3}/>
                 <Card image={image4}/>
                 <Card image={image5}/>
                 <Card image={image6}/>
                 <Card image={image7}/>


          
            <div className={`w-[80px] h-[160px] lg:w-[150px] lg:h-[250px] bg-blue-900 border-2 border-blue-900  rounded-xl overflow-hidden
             hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:bordder-4xl hover:border-white flex items-center justify-center ${selectedImage=="input"?"border-4 border-white shadow-2xl shadow-red-700 ":null}`} 
             onClick={ () => {inputImage.current.click()
                              setSelectedImage("input")

                              }}>
              {!frontendImage &&  <IoIosAdd className=" text-white w-[25px] h-[25px]"/>}
              {frontendImage &&  <img src={frontendImage} className='h-full object-cover'/>}
                     
            </div>
         <input type="file" accept="image/*" ref={inputImage} hidden onChange={handleImage}/>
        </div>  
        {selectedImage &&  <button className=' mt-[30px] min-w-[150px] bg-white h-[60px] rounded-xl text-xl text-black font-semibold cursor-pointer' onClick={()=> navigate("/customize2")} >Next</button>}       
            
        </div>
    )
}

export default Customize