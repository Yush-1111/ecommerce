import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/ProductCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/UploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from "react-toastify"

const AdminEditProduct = ({
 onClose,
 productData,
 fetchdata,
}) => {

    const [data , setData] = useState({
            ...productData,
            productName:productData?.productName,
            brandName:productData?.brandName,
            category:productData?.category,
            productImage:productData?.productImage || [],
            description:productData?.description,
            sellingPrice:productData?.sellingPrice,
            price:productData?.price,
            })
            const [openFullScreenImage , setOpenFullScreenImage] =useState(false)
            const [fullScreenImage, setFullScreenImage] = useState("")
            
            const  handleOnChange = (e)=>{
                const {name,value} = e.target
                setData((preve)=>{
                    return{
                        ...preve,
                        [name] :value
                    }
                })
    
    
            }
            const handleUploadProduct = async(e)=>{
                const file = e.target.files[0]
                const uploadImageCloudinary = await uploadImage(file)
    
                setData((preve)=>{
                    return{
                        ...preve,
                        productImage :[...preve.productImage,uploadImageCloudinary.url]
                    }
                })
    
                
            }
            const handleDeleteProductImage = async(index)=>{
                console.log("image index", index)
    
                const newProductImage = [...data.productImage]
                newProductImage.splice(index,1)
    
                setData((preve)=>{
                    return{
                        ...preve,
                        productImage: [...newProductImage]
                    }
                })
            }
    const handleSubmit = async(e)=>{
        e.preventDefault()
    
        const response = await fetch(SummaryApi.updateProduct.url,{
            method: SummaryApi.updateProduct.method,
            credentials:"include",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(data)
        })
    
         const responseData = await response.json()
         
         if(responseData.success){
            toast.success(responseData?.message)
            onClose()
            fetchdata()
         }
         if(responseData.error){
            toast.error(responseData?.message)
         }
    
    }
  return (
      <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 right-0 left-0 top-0 bottom-0 flex justify-center items-center cursor-pointer'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'> 
                <h2 className='font-bold text-lg'>Edit Product</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer'onClick={onClose}>
                <CgClose />
    
                </div>
                </div>
                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5 'onSubmit={handleSubmit}>
                    <label htmlFor='productName'> Product Name :</label>
                    <input
                    type="text"
                    id='productName'
                    placeholder='enter product name'
                    value={data.productName}
                    name='productName'
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 rounded border'
                    required
                    ></input>
                    <label htmlFor='brandName' className='mt-3'> Brand Name :</label>
                    <input
                    type="text"
                    id='brandName'
                    placeholder='enter brand name'
                    value={data.brandName}
                    name='brandName'
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 rounded border'
                    required
                    ></input>
                     <label htmlFor='category' className='mt-3'> Category :</label>
                     <select value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 rounded border'>
                     <option value={""}>select category</option>
                        {
                            productCategory.map((el,index)=>{
                                return(
                               <option value={el.value} key={el.value+index}>{el.label}</option>
                                )
                            })
                        }
                     </select>
                        <label htmlFor='productImage' className='mt-3'> Product Image :</label>
                        <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 rounded border h-48 w-full flex justify-center items-center cursor-pointer'>
                        <div className='text-slate-400 flex justify-center items-center flex-col gap-2'>
                        <span className='text-4xl'><FaCloudUploadAlt /></span>      
                        <p className='text-sm'>Upload product image</p>         
                         <input 
                         type='file'
                          id='uploadImageInput' 
                          className='hidden' 
                          onChange={handleUploadProduct}
                          
                          />
                            </div>
                        </div>
                            </label>
                        <div>
                            
                            {
                                data?.productImage[0] ?(
                                 <div className='flex items-center gap-2'> 
                                    {
                                        data.productImage.map((el,index)=>{
                                            return(
                                                <div className='relative group'> 
                                                <img 
                                                src={el} 
                                                alt={el}
                                                width={80}
                                                height={80}
                                                className='bg-slate-100 border cursor-pointer' 
                                                onClick={()=>{
                                                    setOpenFullScreenImage(true)
                                                    setFullScreenImage(el)
                                                }} />
                                               <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer ' onClick={()=>handleDeleteProductImage(index)}>
    
                                            <MdDelete />
                                                </div>
                                            </div>
                                                
            
                                            )
                                         })
                                    }
                                 </div>
    
                                ):(
                                <p className='text-red-600 text-xs'>Please upload product image</p>
                                )
                            }
                        </div>
    
                    <label htmlFor='price' className='mt-3'> Price :</label>
                    <input
                    type="number"
                    id='price'
                    placeholder='enter price'
                    value={data.price}
                    name='price'
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 rounded border'
                    required
                    />
    
                    <label htmlFor='sellingPrice' className='mt-3'>  Selling Price :</label>
                    <input
                    type="number"
                    id='sellingPrice'
                    placeholder='enter selling price'
                    value={data.sellingPrice}
                    name='sellingPrice'
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 rounded border'
                    required
                    />
                     <label htmlFor='description' className='mt-3'> Description :</label>
                     <textarea 
                     className=' h-28 bg-slate-100 border resize-none p-1 ' 
                     placeholder='enter product description'
                      rows={3}
                       onChange={handleOnChange}
                        name='description'
                        value={data.description}
                        >

                        </textarea>
    
    
                        <button  className=' py-3 px-1 bg-red-600 text-white mb-10 hover:bg-red-700'>Update Product</button>
                        
                </form>
            </div>
            {
                openFullScreenImage && (
    
                    <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
                )
            }
        </div>
  )
}

export default AdminEditProduct
