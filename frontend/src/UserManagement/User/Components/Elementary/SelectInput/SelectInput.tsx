import React from 'react'


   


const SelectInput = (options:string[]) => {
  return (
    <div>
        <select className="py-3 border-gray-800 border  px-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500">
                    {options.map((items,index)=>(
                      (index==0)?<option selected>{items}</option>
                      :
                      <option value="">{items}</option>

                    ))}
                  
                  </select>
    </div>
  )
}

export default SelectInput