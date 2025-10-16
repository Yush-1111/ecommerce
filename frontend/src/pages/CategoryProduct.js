import React, { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/ProductCategory'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const CategoryProduct = () => {
  const [data, setData] = useState([])
  const [loading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListenArray = urlSearch.getAll("category")

  const urlCategoryListObject = {}
  urlCategoryListenArray.forEach(el => {
    urlCategoryListObject[el] = true
  })

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])
  const [sortBy, setSortBy] = useState("")

  // ✅ useCallback to prevent re-creation on every render
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: filterCategoryList }),
      })
      const responseData = await response.json()
      setData(responseData?.data || [])
      console.log("responseData", responseData)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }, [filterCategoryList])

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }))
  }

  useEffect(() => {
    fetchData()
  }, [fetchData]) // ✅ added safely

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((key) => (selectCategory[key] ? key : null))
      .filter(Boolean)

    setFilterCategoryList(arrayOfCategory)

    const urlFormat = arrayOfCategory
      .map((el, index) =>
        index === arrayOfCategory.length - 1 ? `category=${el}` : `category=${el}&&`
      )
      .join("")

    console.log("urlformat", urlFormat)
    navigate("/product-category?" + urlFormat)
  }, [selectCategory, navigate]) // ✅ added navigate dependency

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target
    setSortBy(value)
    setData((prev) => {
      const sortedData = [...prev]
      if (value === "asc") sortedData.sort((a, b) => a.sellingPrice - b.sellingPrice)
      if (value === "dsc") sortedData.sort((a, b) => b.sellingPrice - a.sellingPrice)
      return sortedData
    })
  }

  return (
    <div className='container mx-auto p-4'>
      {/* Desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* Left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/* Sort By */}
          <div>
            <h3 className='text-base font-medium text-slate-500 uppercase border-b pb-1 border-slate-300'>Sort by</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortby' checked={sortBy === "dsc"} onChange={handleOnChangeSortBy} value={"dsc"} />
                <label>Price: High to Low</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortby' checked={sortBy === "asc"} onChange={handleOnChangeSortBy} value={"asc"} />
                <label>Price: Low to High</label>
              </div>
            </form>
          </div>

          {/* Filter By */}
          <div>
            <h3 className='text-base font-medium text-slate-500 uppercase border-b pb-1 border-slate-300'>Category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {productCategory.map((categoryName, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    name='category'
                    checked={selectCategory[categoryName?.value]}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right side (products) */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results: {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {data.length !== 0 && !loading && <VerticalCard data={data} loading={loading} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
