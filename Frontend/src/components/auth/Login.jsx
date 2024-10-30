import React, { useEffect, useState } from 'react'
import Navbar from '@/components/shared/Navbar'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice.js'
import { Loader2 } from 'lucide-react'
import store from '@/redux/store'

const Login = () => {
  const [input, setInput] = useState(
    {
      email: '',
      password: "",
      role: ''
    });
  const { loading,user } = useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,

      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/")
        toast.success(res.data.message)

      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
  }
  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])


  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 m-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>

          <div className='my-2'>
            <Label>Email</Label>
            <Input type='email' value={input.email} name='email' onChange={changeEventHandler} placeholder="abc@gmail.com"></Input>
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input type='password' value={input.password} name='password' onChange={changeEventHandler} placeholder="Enter Password"></Input>
          </div>
          <div className="flex items-center">
            <RadioGroup className="flex justify-center items-center " >
              <div className="flex items-center space-x-2">
                <Input type='radio' name='role' checked={input.role === "student"} onChange={changeEventHandler} value='student' className='cursor-pointer'></Input>
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='recruiter' checked={input.role === "recruiter"} onChange={changeEventHandler} className='cursor-pointer'></Input>
                <Label htmlFor="option-two">Recruiter</Label>
              </div>

            </RadioGroup>

          </div>
          {
            loading ? <Button className="w-full my-2 bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white font-bold"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait...</Button>:          <Button type='submit' className='w-full my-2 bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white font-bold'>Submit</Button>

          }
          <span className='text-sm'>Create an account? <Link to='/signup'>Login</Link></span>
        </form>
      </div>

    </div>

  )
}

export default Login
