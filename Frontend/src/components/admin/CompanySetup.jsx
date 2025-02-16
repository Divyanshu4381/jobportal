import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { setLoading } from '@/redux/authSlice'

const CompanySetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  useGetCompanyById(params.id);

  const { singleCompany } = useSelector(store => store.company);
  const { loading } = useSelector(store => store.auth);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });

  const changeEventHander = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true))

      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    });
      if (res.data.success) {
        navigate("/admin/companies");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button onClick={() => navigate("/admin/companies")} className="bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white flex items-center gap-2 font-semibold">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input type="text" name="name" value={input.name} onChange={changeEventHander} className="border rounded-xl" />
            </div>
            <div>
              <Label>Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeEventHander} className="border rounded-xl" />
            </div>
            <div>
              <Label>Website</Label>
              <Input type="text" name="website" value={input.website} onChange={changeEventHander} className="border rounded-xl" />
            </div>
            <div>
              <Label>Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeEventHander} className="border rounded-xl" />
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" name='file' onChange={changeFileHandler} className="border rounded-xl" />
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
    </div>
  );
};

export default CompanySetup;
