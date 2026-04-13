import React from 'react'
import Navbar from '../Navbar'
import Course from '../Course'
import Footer from '../Footer'

function courses() {
  return (
    <div>
      <Navbar/>
     <div className="min-h-screen pt-20  dark:text-white">
        <Course/>
     </div>
      <Footer/>
    </div>
  )
}

export default courses