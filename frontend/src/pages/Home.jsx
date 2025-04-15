import React from 'react'
import { Link } from 'react-router-dom';
import Uberlogo from '../assets/uber-logo.png';
import traffic from '../assets/Home-logo.jpg';
const Home = () => {
  return (
    <div>
      <div style={{backgroundImage:`url(${traffic})`,backgroundSize:'cover', backgroundPosition:'center'}} className={` h-screen pt-8  w-full flex justify-between flex-col bg-red-400`}>
      <img className='w-16 ml-8' src={Uberlogo} alt="" />
        <div className='bg-white px-4 py-4 pb-7'>
            <h2 className='text-[35px] font-bold'>Get Started with Uber</h2>
            <Link to='/login' className='flex items-center justify-center text-2xl tex w-full bg-black text-white py-3 rounded-2xl mt-5'>Continue</Link>
        </div>

      </div>
    </div>
  )
}

export default Home
