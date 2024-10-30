import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from './utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import Navbar from './shared/Navbar'
import { toast } from 'sonner'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth)
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false
    
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;
    useEffect(() => {
        const fetchSingleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant==user?._id));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJobs();
    }, [jobId, dispatch, user?._id])
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            console.log(res.data)
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {...singleJob, applications: [...singleJob.applications, { applicant: user?._id}]}
                dispatch(setSingleJob(updatedSingleJob))
                toast.success(res.data.message);

            }
        } catch (error) {
            toast.success(error.response.data.message);
        }
    }
    return (
        <>
            <Navbar />
            <div className='max-w-5xl  mx-auto my-10' >
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='font-bold text-2xl my-2'>{singleJob?.title}</h1>
                        <div className='flex gap'>
                            <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
                            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied} className={` rounded-xl ${isApplied ? 'bg-gray-600 hover:bg-gray-600 text-white cursor-not-allowed' : 'bg-[#6A38C2] hover:bg-[#4101af] text-white'}`}>{isApplied ? <span>Already Applied</span> : <span>Apply Now</span>}
                    </Button>
                </div>
                <h1 className='border-b-2 border-b-gray-300 font-medium my-5 py-4'>Job Description</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1'>Role : <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location : <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description : <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience : <span className='pl-4 font-normal text-gray-800'>{singleJob?.experiencelevel} yrs</span></h1>
                    <h1 className='font-bold my-1'>Salary : <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} Lpa</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants : <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date : <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>

            </div>
        </>
    )
}

export default JobDescription
