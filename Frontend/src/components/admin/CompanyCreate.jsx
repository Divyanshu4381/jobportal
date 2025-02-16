import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate=useNavigate();
    const [companyName,setCompanyName]=useState();
    const dispatch=useDispatch();
    const RegisterNewCompany=async()=>{
        try {
            const res=await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true})
                if(res?.data?.success){
                  dispatch(setSingleCompany(res.data.company));
                  toast.success(res.data.message);
                  const companyId=res?.data?.company?._id
                    navigate(`/admin/companies/${companyId}`)
                }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div>
      <Navbar/>
      <div className="max-w-4xl mx-auto ">
        <div className='my-10'>

        <h1 className="font-bold text-2xl">Your Company Name</h1>
        <p className="text-gray-500">What would you like to give your company name? You can change later.</p>
        </div>
        <Label className="font-bold text-lg">Company Name</Label>
        <Input onChange={(e)=>setCompanyName(e.target.value)} type='text' className='my-3 rounded-xl' placeholder='Career Nest, Microsoft, Google etc.'/>
        <div className='mx-5'>
            
        <Button variant='' onClick={()=>navigate("/admin/companies") }>Cancel</Button>
        <Button onClick={RegisterNewCompany} className='bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white'>Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
