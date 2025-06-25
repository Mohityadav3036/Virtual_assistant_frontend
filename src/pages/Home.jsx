import React from 'react'
import { useContext} from 'react'
import { userDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import userImg from '../assets/v (2).gif'
import aiImg from '../assets/ai.gif'
import {BiMenuAltRight} from 'react-icons/bi';
import {RxCross1} from 'react-icons/rx'
function Home() {
  const {userData,serverUrl,setUserData,getGeminiResponse} = useContext(userDataContext)
  const [listening,setListening] = useState(false)
  const isSpeakingRef = useRef(false)
  const recognitionRef =useRef(null)
  const synth = window.speechSynthesis
  const navigate = useNavigate()
  const [userText,setUserText] = useState("")
  const [aiText, setAiText] = useState("")
  const [ham,setHam] = useState(false)
  const handleLogOut = async () => {
        try{
            const result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
            navigate("/signin")
            setUserData(null)


        }catch(error){
                    console.log(error)
                    setUserData(null)
        }
  }

  const startRecognition = () => {
    try {
       recognitionRef.current?.start();
       setListening(true);
    } catch (error) {
       if(!error.message.includes("start")){
        console.error("Recognition error:", error);
       }
    }
  };

 const speak =async (text) => {
  console.log("speak function call")
  console.log(text)
       const utterence = new SpeechSynthesisUtterance(text)
       isSpeakingRef.current = true
       utterence.onend=()=>{
        isSpeakingRef.current  = false
        // recognitionRef.current?.start()
        setAiText("")
        startRecognition()
       }
      await synth.speak(utterence)
 }

  
const handleCommand= async(data)=>{
  const {type,userInput,response} = data
 await speak(response);
   
   if(type=== 'google-search'){
    const query = encodeURIComponent(userInput);
    window.open(`https://www.google.com/search?q=${query}`,'_blank');
   }

      if(type=== 'calculator-open'){
    // const query = encodeURIComponent(userinput);
    window.open(`https://www.google.com/search?q=calculator`,'_blank');
   }
      if(type=== 'instagram-open'){
    // const query = encodeURIComponent(userinput);
    window.open(`https://www.instagram.com/`,'_blank');
   }
   
    if(type=== 'weather-show'){
    window.open(`https://www.google.com/search?q=weather`,'_blank');
   }


   if(type=== 'youtube-search' || type === 'youtube-play' ){
   const query = encodeURIComponent(userInput);
   window.open(`https://www.youtube.com/results?search_query=${query}`,'_blank');
   }    
}




   useEffect(()=>{
      alert("Please open it on Chrome");
         
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

            if (!SpeechRecognition) {
    console.error("Speech Recognition API not supported in this browser.");
    return;
  }

          const recognition = new SpeechRecognition()
          recognition.continuous = true,
          recognition.lang='en-US',
         

           recognitionRef.current=recognition

          const isRecognizingRef = {current:false}

          const safeRecognition = () => {
             if(!isSpeakingRef.current && !isRecognizingRef.current){
            try {
               recognition.start();
               console.log("Recognition requested to start")
            } catch (error) {
               if(error.name !== "InvalidStateError"){
                console.error("Start error:",error);
               }
            }
            }
          }


           recognition.onstart = () => {
            console.log("Recognition started");
            isRecognizingRef.current = true;
            setListening(true);
           }


           recognition.onend =  ()  => {
              console.log("Recognition ended");
              isRecognizingRef.current = false;
              setListening(false);
           }


           if(!isSpeakingRef.current){
            setTimeout(()=>{
              safeRecognition();
            },1000); 
           }
 

            recognition.onerror = (event) => {
              console.warn("Recognition error:", event.error);
              isRecognizingRef.current=  false;
              setListening(false);
              if(event.error !== "aborted" && !isSpeakingRef.current){
                setTimeout(()=>{
                  safeRecognition();
                },1000)
              }
            }

          recognition.onresult = async (e) => {
                    const transcript = e.results[e.results.length-1][0].transcript.trim()
                    console.log("heart",transcript)
                    if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
                     setAiText("")
                      setUserText(transcript)
                      recognition.stop()
                      isRecognizingRef.current = false
                      setListening(false)
                        const data =  await getGeminiResponse(transcript)
                        console.log("Gemini response data:", data); // Debug log
                        console.log(data.response)
                      // await speak(data.response)
                      handleCommand(data)
                      setAiText(data.response)
                      setUserText("")


          }
          }
        
          // recognition.start()

          const callback  = setInterval(() => {
              if(!isSpeakingRef.current && !isRecognizingRef.current){
                safeRecognition();
              }
          },1000)
          safeRecognition()

          return () => {
            recognition.stop()
            setListening(false)
            isRecognizingRef.current= false
            clearInterval(callback)

          }




          

   },[])
   



  return (
     <div className=" w-full h-[100vh] bg-gradient-to-t from-[black] to-[#050569] flex  justify-center items-center flex-col gap-[10px]">
      
        <BiMenuAltRight className='  text-white absolute top-[20px] right-[20px] w-[25px] h-[25px] cursor-pointer' onClick={()=>setHam(true)}/>

        <div className={` absolute lg:hidden  top-0 w-full h-full bg-[#00000022] backdrop-blur-lg  p-[20px] flex flex-col gap-[20px] items-start ${ham?"translate-x-0":"translate-x-full"}`}>
                      <RxCross1 className=' lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px] cursor-pointer ' onClick={()=>setHam(false)}/>
                       <button type='submit'  className='  min-w-[150px] bg-white h-[50px] rounded-xl text-xl text-black font-semibold   p-[10px] cursor-pointer' onClick={handleLogOut}>Log Out</button>
                      <button type='submit'  className='  min-w-[50px] bg-white h-[50px] rounded-xl text-xl text-black font-semibold    p-[10px] cursor-pointer' onClick={() => navigate("/customize")} > Customize your Assistant </button>


      <div className=' w-full h-[2px] bg-gray-400 '>
      <h1 className='text-white font-semibold text-[19px]'>History</h1>

          <div className=' w-full h-[400px] overflow-y-auto flex flex-col gap-[20px] items-start'>

           {Array.isArray(userData.history) && userData.history.map((his, index) => (
  <span key={index} className="text-white">{his}</span>
))}

          </div>

      </div>


        </div>

          <button type='submit'  className=' mt-[30px] min-w-[150px] bg-white h-[50px] rounded-xl text-xl text-black font-semibold hidden lg:block absolute top-[20px] right-[20px] p-[10px] cursor-pointer' onClick={handleLogOut}>Log Out</button>
          <button type='submit'  className=' mt-[30px] min-w-[50px] bg-white h-[50px] rounded-xl text-xl text-black font-semibold  hidden lg:block absolute top-[80px] right-[20px] p-[10px] cursor-pointer' onClick={() => navigate("/customize")} > Customize your Assistant </button>

      <div className=' w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-2xl '>
                        <img src={userData?.assistantImage} className=' h-full object-cover '/>
      </div>

      <h1 className=' text-white text-[18px] font-bold'>
        I'm {userData?.assistantName}
      </h1>
                        

       {!aiText && <img src={userImg} className=' w-[200px]'/>}
       {aiText && <img src={aiImg} className=' w-[200px]'/>}

       <h1 className=' text-white text-xl'>{userText?userText:aiText?aiText:null}</h1>
{/* <button className='text-white' onClick={() => speak("Hello Mohit!")}>Speak</button> */}

    </div>
    
  )
}

export default Home
