import { JOB_API_END_POINT } from "@/components/utils/constant"
import { setAllJobs } from "@/redux/jobSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const getAllJobs = () => {
  const dispatch= useDispatch()
  useEffect(()=>{
    const fetchAllJobs=async()=>{
        try {
            const res=await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
          console.log(error)
        }
    }
    fetchAllJobs();
  },[])
  
}

export default getAllJobs;
