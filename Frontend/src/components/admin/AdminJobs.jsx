import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { useDispatch } from 'react-redux'
import Footer from '../shared/Footer'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input,setInput]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input])
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10 '>
            <div className='flex items-center justify-between my-5'>

            <Input className="w-fit rounded-xl" onChange={(e)=>setInput(e.target.value)} placeholder="Filter by name"/>
            <Button onClick={()=>navigate("/admin/jobs/create")} className="bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white">Post Jobs</Button>
            </div>
            <AdminJobsTable/>
        </div>
        <Footer/>
    </div>
  )
}

export default AdminJobs
