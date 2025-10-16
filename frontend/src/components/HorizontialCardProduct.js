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
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading || 'Products'}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all relative"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[200px] md:min-w-[320px] max-w-[200px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
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
                className="w-full min-w-[200px] md:min-w-[320px] max-w-[200px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName || 'Product Image'}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid">
                  <h2 className="font-medium text-base md:text-lg text-black">{product.productName}</h2>
                  <p className="capitalize text-slate-600">{product.category}</p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium text-sm">{displayINRCurrency(product.sellingPrice)}</p>
                    <p className="text-slate-500 line-through text-sm">{displayINRCurrency(product.price)}</p>
                  </div>
                  <button
                    className="text-sm bg-red-500 hover:bg-red-700 text-white px-2 py-0.5 rounded-full"
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
