import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@radix-ui/react-label'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer","Blockchain Developer",""]
  },
  {
    filterType: "Salary",
    array: ["3-4 lpa", "4-9 lpa", "9-20 lpa"]
  },
]
const FilterCard = () => {

  return (
    <div className='w-full bg-white p-2 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <div>
        <RadioGroup>
          <Accordion type="single" collapsible>


            {
              filterData.map((data, index) => (
                <div>                 
                  <AccordionItem value="item-1">
                  <AccordionTrigger><h1 className='font-bold text-lg'>{data.filterType}</h1></AccordionTrigger>
                  {
                    data.array.map((item, index) => {
                      return (
                        <AccordionContent>
                          <div className='flex items-center space-x-2 my-1'>
                            <RadioGroupItem value={item} />
                            <Label>{item}</Label>
                          </div>
                        </AccordionContent>
                      )
                    })
                  }
                </AccordionItem>
                </div>
              ))
            }

          </Accordion>
        </RadioGroup>
      </div>
    </div>
  )
}

export default FilterCard
