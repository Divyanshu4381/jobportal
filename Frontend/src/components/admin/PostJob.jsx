import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { setLoading } from '@/redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const PostJob = () => {
    const companyRegistered = [];
    const { companies } = useSelector(store => store.company)
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    })
    const { loading } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() == value)
        setInput({ ...input, companyId: selectedCompany._id })
    }
    const submitEventHandler = async (e) => {
        e.preventDefault();


        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${JOB_API_END_POINT}/post`,input, {
                headers: {
                    'content': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/admin/jobs");
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message)
        } finally {
            dispatch(setLoading(false))
        }
    }


    return (
        <div>
            <Navbar />
            <div className="flex item-center justify-center w-screen my-5 ">

                <form onSubmit={submitEventHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md' >
                    <div className="flex items-center gap-5 p-1">
                        <Button onClick={() => navigate("/admin/jobs")} className="bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white flex items-center gap-2 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className="font-bold text-xl">Post a new Job</h1>
                    </div>
                    <div className="grid grid-cols-3 gap-4">

                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name='title'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border rounded-xl'
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name='description'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border rounded-xl'
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name='requirements'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border rounded-xl'
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name='salary'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border rounded-xl'
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name='location'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border rounded-xl'
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>JobType</Label>
                            <Input
                                type="text"
                                name='jobType'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border rounded-xl'
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Experience Year</Label>
                            <Input
                                type="text"
                                name='experience'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border rounded-xl'
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>No. of Position</Label>
                            <Input
                                type="text"
                                name='position'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border rounded-xl'
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Select Company</Label>
                            {
                                companies.length > 0 && (
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company)=>{
                                                        return (
                                                            <SelectItem key={company._id} value={company?.name?.toLowerCase()} className='font-bold bg-white'>{company.name}</SelectItem>
                                                        )
                                                    })
                                                }
                                                
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                )
                            }
                        </div>
                    </div>
                    {
                        loading ?
                            <Button className="w-full my-2 bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white font-bold">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                            </Button>
                            :
                            <Button type="submit" className="w-full my-2 bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white font-bold">Submit</Button>
                    }
                </form>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default PostJob
