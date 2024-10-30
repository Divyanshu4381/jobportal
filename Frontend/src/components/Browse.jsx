import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import Footer from './shared/Footer'
const ramdomJobs=[1,2,3]
const Browse = () => {
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl'>Search Results ({ramdomJobs.length})</h1>
        <div className="grid grid-cols-3 gap-4 mt-5">

        {
            ramdomJobs.map((item,index)=>{
                return (<Job/>)
            })
        }
        </div>
      </div>
    </div>
  )
}

export default Browse
