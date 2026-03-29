import React, { useEffect } from 'react'
import UploadProduct from '../components/UploadProduct'
import { useState } from 'react'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProduct = () => {
  const [openUploadProduct , setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async()=>{
    const response  = await fetch(SummaryApi.allProduct.url)
    const dataResponse  = await response.json()

    console.log("product data",dataResponse)

    setAllProduct(dataResponse?.data || [])

  }
  useEffect(()=>{
  fetchAllProduct()

  },[])
  return (
    <div>

    <div className='bg-white py-2 px-4 flex justify-between items-center'> 
    <h2 className='font-bold text-lg'>All Product</h2>
    <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-4 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Change products</button>
    </div>

   
   <div className='flex items-center flex-wrap gap-5 py-3 h-[calc(100vh-120px)] overflow-y-scroll'>
   {
   allProduct.map((product,index)=>{
   return(
    <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>

  )
   })
   }
   </div>

   

  {
    openUploadProduct && (
      <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
    )
    
  }
  </div>
  )

}

export default AllProduct



