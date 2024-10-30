import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';


const LatestJobs = () => {
   const {allJobs}=useSelector(store=>store.job)
    return (
        <div className='max-w-7xl mt-[40vh] mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length<=0?<span className='font-md font-black'>No Latest Jobs Available</span>:allJobs.slice(0,6).map((job,index)=><LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs