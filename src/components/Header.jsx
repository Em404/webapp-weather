import React from 'react'
import logo from "../sources/images/logo.jpg"

function Header() {
  return (
    <div className='flex justify-center lg:justify-start items-center space-x-2 py-4'>
        <div className='logo-container'>
            <img src={logo} alt="logo" className="object-cover h-full w-full rounded-full" />
        </div>
        <div>
            <p className='text-white font-bold text-2xl'>NeonWeather</p>
        </div>
        
    </div>
  )
}

export default Header