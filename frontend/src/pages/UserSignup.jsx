import React from 'react'
import { Link } from 'react-router-dom';
import Uberlogo from '../assets/uber-logo.png';
import { useState } from 'react';

const UserSignup = () => {
  const [email,setEmail]= useState('');
        const[password,setPassword] = useState('');
        const[firstName,setFirstName] = useState('');
        const[lastName,setLastName] = useState('');
        const[userData,setUserData] = useState({});
        const submitHandler = (e) => {
          e.preventDefault();
          setUserData({
           fullName:{ firstName:firstName,
            lastName:lastName
          },
            email:email,
            password:password
          })
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          
        }
   
  return (
    <div>
        <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <img className='w-16 mb-3' src={Uberlogo} alt="" />
      <form onSubmit={(e)=>{submitHandler(e)}}>
      <h3 className='text-lg font-medium mb-2'>What's your Name</h3>
      <div className='flex gap-4 mb-4'>
      <input type="text" value={firstName}
 onChange={(e) => setFirstName(e.target.value)}
 placeholder='First Name'  className='bg-[#eeeeee]   rounded px-4 py-2
border w-1/2 text-base placeholder:text-sm' required />
<input type="text" 
value={lastName}
 onChange={(e) => setLastName(e.target.value)}
 placeholder='Last Name' className='bg-[#eeeeee]   rounded px-4 py-2
border w-1/2 text-base placeholder:text-sm' required />

      </div>
      <h3 className='text-base font-medium mb-2'>What's your Email</h3>
<input type="email" value={email} 
 onChange={(e) => setEmail(e.target.value)}
 placeholder='email@example.com' className='bg-[#eeeeee]  mb-4 rounded px-4 py-2
border w-full text-base placeholder:text-sm' required />
<h3 className='text-base font-medium mb-2'>Enter Password</h3>
<input  type="password"
onChange={(e) => setPassword(e.target.value)}
 value={password}
placeholder='Enter your Password' className='bg-[#eeeeee]  mb-4 rounded px-4 py-2
border w-full text-base placeholder:text-sm' required />
<button className='bg-[#111] text-white mb-3 font-semibold rounded px-4 py-2
 w-full text-base placeholder:text-sm'>Login</button>
 <p className='text-center'>Already have account
 <Link to='/login' className='mb-3 text-blue-600'>Login here</Link></p>

      </form>
      </div>
      <div>
       <p className='text-[6px] leading-tight'>This side is protected by reCaptcha and the <span className='underline '> Goolgle Privacy Policy </span>and <span className='underline'>terms of Services apply.</span></p></div>
    </div>
    </div>
  )
}

export default UserSignup
