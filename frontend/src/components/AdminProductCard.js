import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/DisplayCurrency';

const AdminProductCard = ({
    data,
    fetchdata,
}) => {
const [editProduct, setEditProduct] = useState(false)

  return (
    <div className="w-full">
       <div className='bg-white p-4 rounded-xl shadow-sm h-full'>
       <div className='w-full'>
        <div className='w-full h-44 sm:h-40 flex justify-center items-center bg-slate-100 rounded-lg overflow-hidden'>

      <img src={data?.productImage[0]} alt='' className='mx-auto object-contain h-full w-full'/>
        </div>
      
      <h1 className='text-ellipsis line-clamp-2 mt-3 min-h-[48px] font-medium'>{data.productName}</h1>

      

      <div>
      <div>
        <p className='font-semibold'>

        {
          displayINRCurrency(data.sellingPrice)
        }
        </p>
        
      </div>

      <div className='w-fit ml-auto p-3 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer mt-3' onClick={()=>setEditProduct(true)}>
      <MdModeEditOutline />
      </div>
      </div>
       </div>

      
      {
        editProduct && (
          <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>

        )
      }

   </div>
    </div>
  )
}

export default AdminProductCard
