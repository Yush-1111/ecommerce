import React, { useContext } from 'react'
import Context from '../context'
import addToCard from '../helpers/addToCart'
import displayINRCurrency from '../helpers/DisplayCurrency'
import scrollTop from '../helpers/ScrollTop'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading,data = []}) => {
    const loadingList = new Array(13).fill(null)
    const {fetchUserAddToCart} = useContext(Context)
    const handleAddToCart = async(e,id)=>{
     await addToCard(e,id)
     fetchUserAddToCart()
    }

  return (
     <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,300px))] justify-center md:justify-between md:gap-4  overflow-x-scroll scrollbar-none transition-all '>
        
          
        
              { loading ?(
        
        loadingList.map((product,index)=>{
            return(
              
              <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow'>
        
        <div className=' bg-slate-200 h-48 p-4 min-w-[280px]  md:min-w-[145px] flex justify-center items-center animate-pulse'>
        
        </div>
        <div className=' p-4 grid gap-2' >
             <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black animate-pulse rounded-full bg-slate-200 p-1 py-2'></h2>
             <p className='capitalize text-slate-600 animate-pulse rounded-full p-1 bg-slate-200 py-2'></p>
             <div className='flex gap-3'>
              <p className='text-red-600 font-medium animate-pulse rounded-full bg-slate-200 P-1 w-full py-2'></p>
              <p className='text-slate-500 line-through animate-pulse rounded-full bg-slate-200 P-1 w-full py-2'></p>
             </div>
             <button className='text-sm  text-white rounded-full animate-pulse  bg-slate-200 P-1 py-2'></button>
        </div>
        </div>
            )
          })
              ):(
        
                  
                  
                  data.map((product,index)=>{
                      return(
                          
            <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] gap-2 bg-white rounded-sm shadow ' onClick={scrollTop}>
        
              <div className=' bg-slate-200 h-44 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                <img src={product?.productImage[0]}  className='object-scale-down h-full hover:scale-110 transition-all'/>
              </div>
              <div className=' p-4 grid gap-2' >
                   <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                   <p className='capitalize text-slate-600'>{product?.category}</p>
                   <div className='flex gap-3'>
                    <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                    <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                   </div>
                   <button className='text-sm bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to card</button>
              </div>
              </Link>
                  )
                })
            )
            }
            </div>
  )
}

export default VerticalCard
