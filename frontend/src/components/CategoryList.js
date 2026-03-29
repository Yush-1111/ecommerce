import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

    return (
        <div className='container mx-auto px-3 sm:px-4 py-4'>
            <div className='flex items-start gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-2'>
                {loading ? (
                    categoryLoading.map((el, index) => (
                        <div
                            className='flex-shrink-0 h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'
                            key={"categoryLoading" + index}
                        />
                    ))
                ) : (
                    categoryProduct.map((product, index) => (
                        <Link
                            to={"/product-category?category=" + product?.category}
                            className='cursor-pointer flex-shrink-0 w-16 md:w-20'
                            key={product?.category}
                        >
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-200 flex items-center justify-center'>
                                <img
                                    src={product?.productImage[0]}
                                    alt={product?.category}
                                    className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'
                                />
                            </div>
                            <p className='text-center text-xs sm:text-sm md:text-base capitalize break-words'>{product?.category}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

export default CategoryList
