import { JOB_API_END_POINT } from '@/components/utils/constant'
import { setAllAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch=useDispatch();
  useEffect(() => {
     const fetchaAllAdminJobs=async ()=>{
        try {
            const res=await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
            if(res.data.success){
                dispatch(setAllAdminJobs(res.data.jobs))
            }
        } catch (error) {
            console.log(error)
        }
        
     }
  
     fetchaAllAdminJobs()
  },[])
}

export default useGetAllAdminJobs
