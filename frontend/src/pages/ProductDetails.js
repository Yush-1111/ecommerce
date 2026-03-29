

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/DisplayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCard from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    sellingPrice: "",
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCordinate, setZoomImageCordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.ProductDetails.url, {
      method: SummaryApi.ProductDetails.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: params?.id }),
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data || {});
    setActiveImage(dataResponse?.data?.productImage?.[0] || "");
    setLoading(false);
  }, [params?.id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleMouseEnterProduct = (imgURL) => setActiveImage(imgURL);

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => setZoomImage(false);

  const handleAddToCart = async (e, id) => {
    await addToCard(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCard(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4">
      <div className="min-h-[200px] flex flex-col xl:flex-row gap-6">
        {/* Product Images */}
        <div className="flex flex-col lg:flex-row-reverse gap-4 xl:sticky xl:top-28 self-start">
          <div className="h-[280px] w-full max-w-[520px] sm:h-[360px] lg:h-[420px] bg-slate-200 relative p-2 rounded-xl overflow-hidden">
            <img
              src={activeImage}
              alt={data?.productName || "Product Image"}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage}) no-repeat`,
                    backgroundPosition: `${zoomImageCordinate.x * 100}% ${zoomImageCordinate.y * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-x-auto lg:overflow-y-auto scrollbar-none h-full pb-1">
                {productImageListLoading.map((_, index) => (
                  <div
                    key={"loadingImage" + index}
                    className="h-16 w-16 sm:h-20 sm:w-20 bg-slate-200 rounded animate-pulse flex-shrink-0"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-x-auto lg:overflow-y-auto scrollbar-none h-full pb-1">
                {data?.productImage?.map((imgURL, index) => (
                  <div className="h-16 w-16 sm:h-20 sm:w-20 bg-slate-200 rounded p-1 flex-shrink-0" key={imgURL}>
                    <img
                      src={imgURL}
                      alt={`Product Thumbnail ${index + 1}`}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        {loading ? (
          <div className="grid gap-2 w-full">
            <p aria-hidden="true" className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 aria-hidden="true" className="text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full"></h2>
            <p aria-hidden="true" className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full"></p>
            <div aria-hidden="true" className="text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full"></div>
            <div aria-hidden="true" className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>
            <div aria-hidden="true" className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
            </div>
            <div aria-hidden="true">
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></p>
              <p className="bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 flex-1 bg-white rounded-2xl shadow-sm p-4 sm:p-6">
            <p className="bg-red-200 text-red-600 px-3 py-1 rounded-full inline-block w-fit text-sm sm:text-base">{data?.brandName}</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight">{data?.productName}</h2>
            <p className="capitalize text-slate-400 text-sm sm:text-base">{data?.category}</p>

            <div className="text-red-600 flex items-center gap-1">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xl sm:text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">{displayINRCurrency(data.sellingPrice)}</p>
              <p className="text-slate-400 line-through text-lg sm:text-2xl">{displayINRCurrency(data.price)}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 my-2">
              <button
                className="border-2 border-red-600 rounded-full px-4 py-2 min-w-[140px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Buy
              </button>
              <button
                className="border-2 border-red-600 rounded-full px-4 py-2 min-w-[140px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add To Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1 text-base sm:text-lg">Description :</p>
              <p className="text-sm sm:text-base leading-6 text-slate-700">{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategoryWiseProductDisplay category={data?.category} heading="Recommended Product" />
      )}
    </div>
  );
};

export default ProductDetails;
