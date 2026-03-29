import React, { useContext } from 'react'
import Context from '../context'
import addToCard from '../helpers/addToCart'
import displayINRCurrency from '../helpers/DisplayCurrency'
import scrollTop from '../helpers/ScrollTop'
import { Link } from 'react-router-dom'

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null)
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    await addToCard(e, id)
    fetchUserAddToCart()
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 justify-items-center transition-all'>
      {loading
        ? loadingList.map((_, index) => (
            <div
              className='w-full max-w-[320px] bg-white rounded-xl shadow overflow-hidden'
              key={'loading' + index}
            >
              <div className='bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse'></div>
              <div className='p-4 grid gap-2'>
                {/* Skeleton heading with visually hidden content */}
                <h2 className='sr-only'>Loading product</h2>
                <p className='capitalize text-slate-600 animate-pulse rounded-full p-2 bg-slate-200' aria-hidden='true'>
                  &nbsp;
                </p>
                <div className='flex gap-3'>
                  <p className='text-red-600 font-medium animate-pulse rounded-full bg-slate-200 w-full p-2' aria-hidden='true'>
                    &nbsp;
                  </p>
                  <p className='text-slate-500 line-through animate-pulse rounded-full bg-slate-200 w-full p-2' aria-hidden='true'>
                    &nbsp;
                  </p>
                </div>
                <button className='text-sm text-white rounded-full animate-pulse bg-slate-200 w-full p-2' aria-hidden='true'>
                  &nbsp;
                </button>
              </div>
            </div>
          ))
        : data.map((product) => (
            <Link
              to={'/product/' + product?._id}
              className='w-full max-w-[320px] gap-2 bg-white rounded-xl shadow overflow-hidden'
              onClick={scrollTop}
              key={product?._id}
            >
              <div className='bg-slate-200 h-44 p-4 flex justify-center items-center'>
                <img
                  src={product?.productImage[0]}
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
  )
}

export default VerticalCard
