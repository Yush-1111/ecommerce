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
    <div className="">
       <div className='bg-white p-4 rounded ml-1 mr-11'>
       <div className='w-40'>
        <div className=' w-32 h-32 flex justify-center items-center'>

      <img src={data?.productImage[0]} className='  mx-auto object-fill h-full'/>
        </div>
      
      <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

      

      <div>
      <div>
        <p className='font-semibold'>

        {
          displayINRCurrency(data.sellingPrice)
        }
        </p>
        
      </div>

      <div className=' w-fit ml-auto p-3 bg-green-100 hover:bg-green-600  rounded-full hover:text-white cursor-pointer ' onClick={()=>setEditProduct(true)}>
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
