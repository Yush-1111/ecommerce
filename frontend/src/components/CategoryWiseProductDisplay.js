import React, { useContext, useEffect, useState, useCallback } from 'react'
import fetchGetCategoryProduct from '../helpers/fetchGetCategoryProduct'
import displayINRCurrency from '../helpers/DisplayCurrency'
import { Link } from 'react-router-dom'
import addToCard from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/ScrollTop'

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(13).fill(null)
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    await addToCard(e, id)
    fetchUserAddToCart()
  }

  // useCallback to prevent useEffect warning
  const fetchData = useCallback(async () => {
    setLoading(true)
    const categoryProduct = await fetchGetCategoryProduct(category)
    setData(categoryProduct?.data)
    setLoading(false)
  }, [category])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      {/* Heading with content */}
      <h2 className='text-2xl font-semibold py-4'>{heading || `Products for ${category}`}</h2>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
        {loading
          ? loadingList.map((_, index) => (
              <div
                className='w-full min-w-[200px] md:min-w-[320px] max-w-[200px] md:max-w-[320px] bg-white rounded-sm shadow'
                key={'loading' + index}
              >
                <div className='bg-slate-200 h-44 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
                <div className='p-4 grid gap-2'>
                  {/* Empty heading for skeleton */}
                  <h2
                    className='font-medium text-base md:text-lg text-black animate-pulse rounded-full bg-slate-200 p-2'
                    aria-hidden="true"
                  >
                    &nbsp;
                  </h2>
                  <p className='capitalize text-slate-600 animate-pulse rounded-full p-2 bg-slate-200' aria-hidden="true">&nbsp;</p>
                  <div className='flex gap-3'>
                    <p className='text-red-600 font-medium animate-pulse rounded-full bg-slate-200 w-full p-2' aria-hidden="true">&nbsp;</p>
                    <p className='text-slate-500 line-through animate-pulse rounded-full bg-slate-200 w-full p-2' aria-hidden="true">&nbsp;</p>
                  </div>
                  <button className='text-sm text-white rounded-full animate-pulse bg-slate-200 w-full p-2' aria-hidden="true">&nbsp;</button>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                to={'/product/' + product?._id}
                className='w-full min-w-[200px] md:min-w-[320px] max-w-[200px] md:max-w-[320px] bg-white rounded-sm shadow'
                onClick={scrollTop}
                key={product?._id}
              >
                <div className='bg-slate-200 h-44 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                  <img
                    src={product.productImage[0]}
                    alt={product?.productName || 'Product image'}
                    className='object-scale-down h-full hover:scale-110 transition-all'
                  />
                </div>
                <div className='p-4 grid gap-2'>
                  <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                    {product?.productName}
                  </h2>
                  <p className='capitalize text-slate-600'>{product?.category}</p>
                  <div className='flex gap-3'>
                    <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                    <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                  </div>
                  <button
                    className='text-sm bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-full'
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  )
}

export default CategoryWiseProductDisplay
