import React from 'react'
import Navbar from '../shared/Navbar'
import { Form, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const CompanySetup = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <Form action=''>
          <div className="flex items-center gap-5 p-8">

            <Button onClick={() => { navigate("/admin/companies") }} className="bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white flex items-center gap-2  font-semibold">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className='font-bold text-xl'>Company Setup</h1>
          </div>
          <Label type='text' name='name' className='border rounded-xl'>Company Name</Label>
          <Input/>
        </Form>
      </div>
    </div>
  )
}

export default CompanySetup
