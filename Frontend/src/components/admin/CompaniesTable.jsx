import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'

const CompaniesTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A List of your recent registerend Company</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableCell>
                        <Avatar>
                            <AvatarImage src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727136000&semt=ais_hybrid" />
                        </Avatar>
                    </TableCell>
                    <TableCell>Google</TableCell>
                    <TableCell>27-09-2024</TableCell>
                    <TableCell className="text-right">
                        <Popover>
                            <PopoverTrigger className=' cursor-pointer'><MoreHorizontal/>
                            </PopoverTrigger>
                            <PopoverContent className='w-16'><div className='flex justify-between items-center'><Edit2/><span className='font-bold'>Edit</span></div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable
