import { ExternalLink } from 'lucide-react'
import React, { useState } from 'react'
import 'animate.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';
const API_KEY = "";

export default function App() {
const[message,setMessage] = useState('')
const [chat,setChats]= useState([]);
const [isTyping,setTyping] = useState(false)

const createChat = async(e)=>{
    try{
  e.preventDefault()
  setChats((prev)=>[...prev,   {
    sender:"me",
    message:message,
    createAt:new Date()
    }])
     setMessage('')
    setTyping(true)
  const payload= {
    contents:{
      parts:{
        text:`Answer this in short- ${message}`
      }
    }

  }
  const options = {
    headers:{
      "X-goog-api-key":API_KEY
    }
  }
 const {data} = await  axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',payload,options)

 const aiResult = data.candidates[0].content.parts[0].text;

     setChats((prev)=>[...prev,   {
    sender:"ai",
    message:aiResult,
    createAt:new Date()
    }])
 

}catch(err){
toast.error(err.message);

  }
  finally{
      setTyping(false)
  }
}

  return (
    <div className='bg-gray-200 min-h-screen'>
   <div className='lg:w-9/12 mx-auto bg-white min-h-screen pb-48 py-12'>
   <h1 className='text-3xl font-bold text-center mb-2'>🤖 AI CHAT</h1>
   <hr />
   
   <div className='p-8 space-y-6'>
{

  chat.map((item,index)=>(
    <div key={index}>
      {  
        item.sender === 'me' &&         
          <div className='flex flex-col gap-2  justify-start animate__animated animate__fadeIn'>         
            <div className='bg-rose-200 text-black-500 font-medium px-6 py-3 rounded-xl w-9/12'>
           {item.message}
             <div className=' flex justify-end text-gray-800 text-xs'> 
              <label>{moment(item.createAt).format('DD/MM/YYYY ,hh:mm:ss A')}</label>
            </div>
            </div>
          
          </div>
      }


       {  
        item.sender === 'ai' &&    
      <div className='flex  flex-col gap-2 items-end animate__animated animate__fadeIn '>
     
      <div className='bg-green-200 text-black-500 font-medium px-6 py-3 rounded-xl  w-9/12'>
        {item.message}
         <div className=' flex justify-end text-gray-800 text-xs'> 
              <label>{moment(item.createAt).format('DD/MM/YYYY ,hh:mm:ss A')}</label>
            </div>
      </div>
    </div>
      }






      </div>

  ))


}









   </div>
   {
    isTyping &&
    <div className='flex justify-end px-8'>
            <small className='text-gray-500 text-sm font-medium animate__animated animate__fadeIn'>Typing...</small>
      </div>
   }
   <div className='bg-indigo-600 lg:p-8 p-4 fixed bottom-0  lg:w-9/12 w-full'>

   <form className='flex gap-4' onSubmit={createChat}>
    <input 
    required
    className='bg-white rounded-xl p-6 w-full '
    placeholder='Chat with ai from here'
    value={message}
    onChange={(e)=>setMessage(e.target.value)}
    />
    <button  className='bg-yellow-600 px-12 rounded-xl px-12  text-white flex-col items-center justify-center hover:bg-green-400 hover:scale-105transition-transform duration-300 '>
      <ExternalLink />
      Send
    </button>
   
   </form>



   </div>





   </div>
        <ToastContainer />
    </div>
  )
}
   