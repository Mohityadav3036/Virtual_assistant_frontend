import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext.jsx'

function Card({image}) {
  const { serverUrl,userData,setUserData,
         backendImage,setBackendImage,
         frontendImage,setFrontendImage,
         selectedImage,setSelectedImage} = useContext(userDataContext)

  return (
    <div className={` w-[80px] h-[160px] lg:w-[150px] lg:h-[250px]
     bg-blue-900 border-2 border-blue-900  rounded-xl overflow-hidden hover:shadow-2xl
     hover:shadow-blue-950 cursor-pointer hover:bordder-4xl
     hover:border-white ${selectedImage==image?"border-4 border-white shadow-2xl shadow-red-700 ":null}`} 
      onClick={()=>{
        setSelectedImage(image)
        setBackendImage(null)
        setFrontendImage(null)          
                   
      }}>
            <img src={image} className='h-full object-cover' />       
    </div>
  )
}

export default Card
