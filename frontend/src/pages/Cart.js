import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/DisplayCurrency'
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data, setData] = useState([])
    const [loading,setLoading] = useState(false)
     const context = useContext(Context)
     const loadingCart = new Array(context.cartProductCount).fill(null)
     
    
    
    


    const fetchData = async()=>{
        // setLoading(true)
        const response = await fetch(SummaryApi.addtoCartProductView.url,{
            method:SummaryApi.addtoCartProductView.method,
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
        })
        //  setLoading(false)
        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }
    }
    const handleLoading = async()=>{
         await fetchData()

    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
        setLoading(false)
    },[])

    const increaseQty = async(id,qty)=>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method:SummaryApi.updateCartProduct.method,
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
            _id : id,
             quantity : qty + 1
            }
        )
        })
        const responseData = await response.json()

        if(responseData.success){
            fetchData()
        }
    }

    const decreaseQty = async(id,qty)=>{
        if(qty >= 2){

            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method:SummaryApi.updateCartProduct.method,
                credentials:"include",
                headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    _id : id,
                    quantity : qty -1
                }
            )
        })
        const responseData = await response.json()
        
        if(responseData.success){
            fetchData()
        }
    }
    }
    const deleteProduct = async(id)=>{
        

            const response = await fetch(SummaryApi.deleteCartProduct.url,{
                method:SummaryApi.deleteCartProduct.method,
                credentials:"include",
                headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    _id : id,
                    
                }
            )
        })
        const responseData = await response.json()
        
        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    
    }

    const totalQty = data.reduce((previousValue,currentValue) => previousValue + currentValue.quantity,0)
     const totalPrice = data.reduce((preve,curr) => preve + (curr.quantity * curr?.productId?.sellingPrice),0)
     
  return (
    <div className='container mx-auto'>
     
     
      <div className='text-center text-lg my-3'>

      {
        data.length === 0 & !loading && (
            <p className='bg-white py-5'>No Data</p>
        )
    }
    </div>

    <div className='flex flex-col lg:flex-row gap-10 justify-between p-4'>

    {/* ......view cart */}

    <div className='w-full max-w-3xl'>
    {
     loading ?(
        loadingCart?.map((el,index)=>{
            return(
                <div key={el+"Add to Cart Product"+index} className='bg-slate-200 w-full my-2 h-32 border border-slate-300 rounded'>
     
                </div>
           
            )

        })
     ):(
    data.map((product,index)=>{
        return(
     <div key={product?._id +"Add to Cart Product"} className='bg-white w-full my-2 h-32 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
     
     <div className='w-32 h-32 bg-slate-200  py-2 px-2 overflow-hidden  '>
      <img src={product?.productId?.productImage[0]} className='h-full w-full object-scale-down  hover:scale-110  transition-all cursor-pointer mix-blend-multiply'/>
     </div>
     <div  className='px-4 py-2 relative'>


        {/* ......delete button  for add to cart */}

        <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteProduct(product?._id)}>
        <MdDelete />

        </div>
        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
        <div className='flex items-center justify-between'>
      <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
      <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
        
        </div>
        <div className=' flex items-center gap-3 mt-1'>
            <button className='border border-red-500 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
            <p>{product?.quantity}</p>
            <button className='border border-red-500 text-red-600  hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
        </div>
     </div>
     </div>

        )

    })
     )
    
    }
    {/* ..... total summary add to cart */}

    </div>
        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
    {
     loading ?(
         <div className='h-36 bg-slate-300 border border-slate-300 animate-pulse'>
         </div>
     ):(
         <div className='h-36 bg-white mb-0'>
            <h2 className='text-white bg-red-500 px-4 py-1'>Summary</h2>
          <div className='flex items-center justify-between px-4  gap-2 font-medium text-lg text-slate-600'>
            <p> Quantity</p>
            <p>{totalQty}</p>
          </div>
          <div className='flex items-center justify-between px-4  gap-2 font-medium text-lg text-slate-600'>
            <p>TotalPrice </p>
            <p>{displayINRCurrency(totalPrice)}</p>
          </div>
          <button className='text-white bg-blue-600 p-2 w-full '> Payment </button>
        </div>
     )
    }
        </div>
    
    </div>
    </div>
  )
}

export default Cart
