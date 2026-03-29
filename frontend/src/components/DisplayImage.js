import React from 'react'
import { CgClose } from "react-icons/cg";

const DisplayImage = ({
    imgUrl,
    onClose

}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 bg-black/60 flex justify-center items-center p-3 sm:p-4 z-50'>
        <div className='bg-white shadow-lg rounded-xl w-full max-w-5xl mx-auto p-3 sm:p-4'>
        <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer'onClick={onClose}>
        <CgClose />
        
      </div>
     <div className='flex justify-center p-2 sm:p-4 max-h-[75vh] overflow-hidden'>
        <img src={imgUrl} alt='' className='w-full h-full object-contain'/>

      
    </div>
        </div>

    </div>
  )
}

export default DisplayImage
