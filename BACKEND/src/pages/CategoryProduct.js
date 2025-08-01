import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/ProductCategory'

import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const CategoryProduct = () => {

  const [data ,setData] = useState([])
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListenArray = urlSearch.getAll("category")

 const urlCategoryListObject = {}
 urlCategoryListenArray.forEach(el=>{
  urlCategoryListObject[el] = true
 }) 


  // console.log("urlCategoryListObject",urlCategoryListObject)
  // console.log("urlCategoryListenArray",urlCategoryListenArray)




  const [selectCategory , setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList , setFilterCategoryList] = useState([])

  const [sortBy , setSortBy] = useState("")

  
  
  const fetchData = async()=>{
    const response = await fetch(SummaryApi.filterProduct.url,{
      method: SummaryApi.filterProduct.method,
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        category :filterCategoryList
      })
    })
    const responseData = await response.json()

    setData(responseData?.data || [] )

    console.log("responseData",responseData)
  }
  const handleSelectCategory = (e)=>{
    const {name,value,checked} = e.target
    setSelectCategory((preve)=>{
      return{
        ...preve,
        [value] : checked
      }
    })
  }
  useEffect(()=>{
    fetchData()
  },[filterCategoryList])


  useEffect(()=>{
  const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
    if(selectCategory[categoryKeyName]){
      return categoryKeyName

    }
    return null
  }).filter(el => el)

  setFilterCategoryList(arrayOfCategory)

  const urlFormat = arrayOfCategory.map((el,index)=>{
    if((arrayOfCategory.length -1) === index){
      return `category=${el}`
    }
    return `category=${el}&&`
  })
   console.log("urlformat",urlFormat.join(""))
  navigate("/product-category?"+urlFormat.join(""))

  },[selectCategory])

  const handleOnChangeSortBy = (e)=>{
    const {value} = e.target
    setSortBy(value)
    if(value === "asc"){
      setData(preve =>preve.sort((a,b) => a.sellingPrice - b.sellingPrice))
    }
    if(value === "dsc"){
      setData(preve =>preve.sort((a,b) => b.sellingPrice - a.sellingPrice))
    }
  }
  useEffect(()=>{

  },[sortBy])

  return (
    <div className='container mx-auto p-4'>
      {/* ....Destok version */}

      <div className='hidden lg:grid grid-cols-[200px,1fr]'> 
       {/* ....left side */}

       <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll' >
        {/* ...Sort By */}
          <div className=''>
            <h3 className='text-base font-medium text-slate-500 uppercase border-b pb-1 border-slate-300'>Sort by</h3>
            <form className=' text-sm flex flex-col gap-2 py-2'>
              <div className=' flex items-center gap-3'>
                <input type='radio' name='sortby'checked={sortBy === "dsc"} onChange={handleOnChangeSortBy} value={"dsc"}></input>
                <label>Price: High to Low </label>
              </div>
              <div className=' text-sm flex items-center gap-3'>
                <input type='radio' name='sortby'checked={sortBy ==="asc"} onChange={handleOnChangeSortBy} value={"asc"}></input>
                <label>Price: Low to High </label>
              </div>

            </form>
          </div>

            {/* ...Filter By */}
            <div className=''>
            <h3 className='text-base font-medium text-slate-500 uppercase border-b pb-1 border-slate-300'>Category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
            {
              productCategory.map((categoryName,index)=>{
                return(
                  <div className='flex items-center gap-3'>
                    <input type='checkbox' name={'category'} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/>
                    <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                  </div>
                )
              })
            }

            </form>
          </div>
       </div>

       {/* ....Right side (product)*/}
       <div className='px-4'>
              <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

             <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
              {
                  data.length !== 0 && !loading && (
                    <VerticalCard data={data} loading={loading}/>
                  )
              }
             </div>
            </div>
      </div>
    </div>
  )
}

export default CategoryProduct
