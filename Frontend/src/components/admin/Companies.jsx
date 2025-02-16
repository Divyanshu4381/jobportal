import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { useDispatch } from 'react-redux'
import Footer from '../shared/Footer'

const Companies = () => {
    useGetAllCompanies();
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
            <Button onClick={()=>navigate("/admin/companies/create")} className="bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white">New Company</Button>
            </div>
            <CompaniesTable/>
        </div>
        <Footer/>
    </div>
  )
}

export default Companies
