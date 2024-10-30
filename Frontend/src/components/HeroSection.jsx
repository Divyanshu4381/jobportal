import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
    
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
            <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>An Interactive Job and Intership Platform for Technical Education Department,Govt. of Rajasthan</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>5 lakh+ jobs for you to explore</p>
                <div className='flex w-[40%] shadow-lg border border-black pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        
                        className='outline-none border-none w-full'

                    />
                    <Button className="rounded-r-full  bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection