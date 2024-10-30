import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>
                    List of All Applied Job
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {
                        [1, 2].map((item, index) => (
                            <TableRow key={index} variant='outline'>
                                <TableCell>27-09-2024</TableCell>
                                <TableCell>Frontend Developer</TableCell>
                                <TableCell>Google</TableCell>
                                <TableCell className="text-right"><Badge className='bg-black text-white gap-5 hover:bg-black '>Pending</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>

            </Table>
        </div>
    )
}

export default AppliedJobTable
