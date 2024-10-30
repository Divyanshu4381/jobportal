import React, { useState } from 'react'
import Navbar from '@/components/shared/Navbar'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice.js'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState(
        {
            fullname: "",
            email: "",
            phone: "",
            password: "",
            role: "",
            file: ""
        });
    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phone", input.phone);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            console.log(res)
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false))
        }
    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 m-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-1'>
                        <Label>Full Name</Label>
                        <Input type='text' value={input.fullname} name='fullname' onChange={changeEventHandler} placeholder="Enter your Full name"></Input>
                    </div>
                    <div className='my-1'>
                        <Label>Email</Label>
                        <Input type='email' value={input.email} name='email' onChange={changeEventHandler} placeholder="abc@gmail.com"></Input>
                    </div>
                    <div className='my-1'>
                        <Label>Phone</Label>
                        <Input type='text' value={input.phone} name='phone' onChange={changeEventHandler} placeholder="Enter your phone number"></Input>
                    </div>
                    <div className='my-1'>
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
                        <div className="flex items-center gap-2 w-1/4  "></div>
                        <Label className=''>Profile</Label>
                        <Input accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer mx-2"></Input>
                    </div>

                    {
                        loading ? <Button className="w-full my-2 bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white font-bold"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait...</Button> : <Button type='submit' className='w-full my-2 bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white font-bold'>Submit</Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to='/login'>Login</Link></span>
                </form>
            </div>

        </div>
    )
}

export default Signup
