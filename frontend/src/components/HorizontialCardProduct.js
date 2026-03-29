import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import fetchGetCategoryProduct from '../helpers/fetchGetCategoryProduct';
import displayINRCurrency from '../helpers/DisplayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import addToCard from '../helpers/addToCart';
import Context from '../context';

const HorizontialCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCard(e, id);
    fetchUserAddToCart();
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const categoryProduct = await fetchGetCategoryProduct(category);
    setData(categoryProduct?.data || []);
    setLoading(false);
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const scrollLeft = () => (scrollElement.current.scrollLeft -= 500);
  const scrollRight = () => (scrollElement.current.scrollLeft += 500);

  return (
    <div className="container mx-auto px-3 sm:px-4 my-6 relative">
      <h2 className="text-xl sm:text-2xl font-semibold py-4">{heading || 'Products'}</h2>

      <div
        className="flex items-stretch gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-none transition-all relative pb-2"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-2 absolute left-0 top-1/2 -translate-y-1/2 text-lg hidden lg:block z-10"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-2 absolute right-0 top-1/2 -translate-y-1/2 text-lg hidden lg:block z-10"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[260px] sm:min-w-[320px] max-w-[260px] sm:max-w-[320px] min-h-[160px] bg-white rounded-xl shadow flex flex-col sm:flex-row overflow-hidden"
              >
                <div className="bg-slate-200 h-32 sm:h-auto p-4 min-w-full sm:min-w-[145px] animate-pulse"></div>
                <div className="p-4 grid w-full gap-2">
                  <h2
                    className="font-medium text-base md:text-lg bg-slate-200 animate-pulse p-1 rounded-full"
                    aria-hidden="true"
                  >
                    &nbsp;
                  </h2>
                  <p className="bg-slate-200 animate-pulse rounded-full p-1" aria-hidden="true">
                    &nbsp;
                  </p>
                  <div className="flex gap-3 w-full">
                    <p className="bg-slate-200 animate-pulse w-full rounded-full p-1" aria-hidden="true">
                      &nbsp;
                    </p>
                    <p className="bg-slate-200 animate-pulse w-full rounded-full p-1" aria-hidden="true">
                      &nbsp;
                    </p>
                  </div>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product._id}
                to={`product/${product._id}`}
                className="w-full min-w-[260px] sm:min-w-[320px] max-w-[260px] sm:max-w-[320px] min-h-[160px] bg-white rounded-xl shadow flex flex-col sm:flex-row overflow-hidden"
              >
                <div className="bg-slate-200 h-32 sm:h-auto p-4 min-w-full sm:min-w-[145px] flex items-center justify-center">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName || 'Product Image'}
                    className="object-scale-down h-full w-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-2 flex-1">
                  <h2 className="font-medium text-base md:text-lg text-black line-clamp-2">{product.productName}</h2>
                  <p className="capitalize text-slate-600 text-sm sm:text-base">{product.category}</p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <p className="text-red-600 font-medium text-sm">{displayINRCurrency(product.sellingPrice)}</p>
                    <p className="text-slate-500 line-through text-sm">{displayINRCurrency(product.price)}</p>
                  </div>
                  <button
                    className="text-sm bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded-full w-full sm:w-fit"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontialCardProduct;
