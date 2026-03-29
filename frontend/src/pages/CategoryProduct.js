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

  // useCallback to prevent re-creation on every render
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
    <div className='container mx-auto px-3 sm:px-4 py-4'>
      <div className='grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-4'>
        <div className='bg-white p-4 rounded-xl shadow-sm h-fit lg:sticky lg:top-28'>
          <div>
            <h3 className='text-sm sm:text-base font-medium text-slate-500 uppercase border-b pb-2 border-slate-300'>Sort by</h3>
            <form className='text-sm flex flex-col gap-3 py-3'>
              <label className='flex items-center gap-3'>
                <input type='radio' name='sortby' checked={sortBy === "dsc"} onChange={handleOnChangeSortBy} value={"dsc"} />
                <span>Price: High to Low</span>
              </label>
              <label className='flex items-center gap-3'>
                <input type='radio' name='sortby' checked={sortBy === "asc"} onChange={handleOnChangeSortBy} value={"asc"} />
                <span>Price: Low to High</span>
              </label>
            </form>
          </div>

          <div className='mt-2'>
            <h3 className='text-sm sm:text-base font-medium text-slate-500 uppercase border-b pb-2 border-slate-300'>Category</h3>
            <form className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 py-3 text-sm'>
              {productCategory.map((categoryName, index) => (
                <label key={index} className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    name='category'
                    checked={selectCategory[categoryName?.value]}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                  />
                  <span>{categoryName?.label}</span>
                </label>
              ))}
            </form>
          </div>
        </div>

        <div>
          <div className='bg-white rounded-xl shadow-sm p-4 mb-4'>
            <p className='font-medium text-slate-800 text-base sm:text-lg'>Search Results: {data.length}</p>
          </div>

          {data.length === 0 && !loading ? (
            <div className='bg-white rounded-xl shadow-sm p-6 text-center text-slate-500'>
              No products found for the selected filters.
            </div>
          ) : (
            <VerticalCard data={data} loading={loading} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
