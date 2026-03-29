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
    <div className='container mx-auto px-3 sm:px-4 my-6 relative'>
      {/* Heading with content */}
      <h2 className='text-xl sm:text-2xl font-semibold py-4'>{heading || `Products for ${category}`}</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 justify-items-center transition-all'>
        {loading
          ? loadingList.map((_, index) => (
              <div
                className='w-full max-w-[320px] bg-white rounded-xl shadow overflow-hidden'
                key={'loading' + index}
              >
                <div className='bg-slate-200 h-44 p-4 flex justify-center items-center animate-pulse'></div>
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
                className='w-full max-w-[320px] bg-white rounded-xl shadow overflow-hidden'
                onClick={scrollTop}
                key={product?._id}
              >
                <div className='bg-slate-200 h-44 p-4 flex justify-center items-center'>
                  <img
                    src={product.productImage[0]}
                    alt={product?.productName || 'Product image'}
                    className='object-scale-down h-full w-full hover:scale-110 transition-all'
                  />
                </div>
                <div className='p-4 grid gap-2'>
                  <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-2 text-black min-h-[48px]'>
                    {product?.productName}
                  </h2>
                  <p className='capitalize text-slate-600 text-sm sm:text-base'>{product?.category}</p>
                  <div className='flex flex-wrap gap-2 sm:gap-3'>
                    <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                    <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                  </div>
                  <button
                    className='text-sm bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded-full w-full'
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
