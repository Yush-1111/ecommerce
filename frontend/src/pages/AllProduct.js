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
    <div className='min-h-screen'>

    <div className='bg-white py-3 px-4 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'> 
    <h2 className='font-bold text-lg sm:text-2xl'>All Product</h2>
    <button className='w-full sm:w-auto border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-4 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Change products</button>
    </div>

   
   <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4'>
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


