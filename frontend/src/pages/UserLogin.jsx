import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Uberlogo from '../assets/uber-logo.png';

const UserLogin = () => {

  const [email,setEmail]= useState('');
  const[password,setPassword] = useState('');
  const[userData,setUserData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email:email,
      password:password
    })
    setEmail('');
    setPassword('');
    
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <img className='w-16 mb-10' src={Uberlogo} alt="" />
      <form onSubmit={(e)=>{submitHandler(e)}}>
      <h3 className='text-lg font-medium mb-2'>What's your Email</h3>
<input type="email" value={email} 
 onChange={(e) => setEmail(e.target.value)}
 placeholder='email@example.com' className='bg-[#eeeeee]  mb-4 rounded px-4 py-2
border w-full text-lg placeholder:text-base' required />
<h3 className='text-lg font-medium mb-2'>Enter Password</h3>
<input  type="password"
onChange={(e) => setPassword(e.target.value)}
 value={password}
placeholder='Enter your Password' className='bg-[#eeeeee]  mb-4 rounded px-4 py-2
border w-full text-lg placeholder:text-base' required />
<button className='bg-[#111] text-white mb-3 font-semibold rounded px-4 py-2
 w-full text-lg placeholder:text-base'>Login</button>
 <p className='text-center'>New here?
 <Link to='/signup' className='mb-3 text-blue-600'>Create new Account</Link></p>

      </form>
      </div>
      <div>
        <Link to='/captain-login' className='bg-[#10b461] flex items-center justify-center text-white mb-5 font-semibold rounded px-4 py-2
 w-full text-lg placeholder:text-base' >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
