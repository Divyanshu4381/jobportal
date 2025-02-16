import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from '../ui/avatar'

const AdminJobsTable = () => {
    const navigate = useNavigate();

    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>A List of your recent post Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {
                        filterJobs?.map((job) => {
                            return (
                                <tr>

                                    <TableCell className='flex items-center gap-2'>
                                        <Avatar>
                                            <AvatarImage src={job?.company.logo} />
                                        </Avatar>
                                        {job?.company?.name}</TableCell>
                                    <TableCell>{job?.title}</TableCell>

                                    <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className='w-16' >
                                                <div onClick={() => navigate(`/admin/jobs/${job._id}/`)} className='flex justify-between items-center'><Edit2 /><span className='font-bold' >Edit</span></div>
                                                <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                    <Eye className='w-4' />
                                                    <span>Applicants</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>

                            )
                        })
                    }

                </TableBody>
            </Table>
        </div>
    )
}


export default AdminJobsTable
