import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/DisplayCurrency';
import { MdDelete } from "react-icons/md";
import { getAuthHeaders } from '../helpers/auth';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  // Fetch cart products
  const fetchData = async () => {
    const response = await fetch(SummaryApi.addtoCartProductView.url, {
      method: SummaryApi.addtoCartProductView.method,
      headers: getAuthHeaders({
        "Content-Type": "application/json",
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  // Load cart data with proper loading state
  useEffect(() => {
    const loadCartData = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    loadCartData();
  }, []);

  // Increase product quantity
  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ _id: id, quantity: qty + 1 }),
    });
    const responseData = await response.json();
    if (responseData.success) fetchData();
  };

  // Decrease product quantity
  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ _id: id, quantity: qty - 1 }),
      });
      const responseData = await response.json();
      if (responseData.success) fetchData();
    }
  };

  // Delete product from cart
  const deleteProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ _id: id }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  // Cart summary calculations
  const totalQty = data.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = data.reduce(
    (sum, item) => sum + item.quantity * (item?.productId?.sellingPrice || 0),
    0
  );

  return (
    <div className="container mx-auto px-3 sm:px-4">
      {/* No Data Message */}
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col xl:flex-row gap-6 lg:gap-10 justify-between py-4">
        {/* Cart Products */}
        <div className="w-full max-w-4xl">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={index}
                  className="bg-slate-200 w-full my-2 h-32 border border-slate-300 rounded"
                ></div>
              ))
            : data.map((product) => (
                <div
                  key={product?._id}
                  className="bg-white w-full my-2 min-h-[180px] sm:min-h-[128px] border border-slate-300 rounded-xl grid grid-cols-1 sm:grid-cols-[128px,1fr] overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-44 sm:h-32 bg-slate-200 py-2 px-2 overflow-hidden">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName || 'Product Image'}
                      className="h-full w-full object-scale-down hover:scale-110 transition-all cursor-pointer mix-blend-multiply"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="px-4 py-3 relative">
                    {/* Delete Button */}
                    <div
                      className="absolute right-2 top-2 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>

                    <h2 className="text-base sm:text-lg lg:text-xl text-ellipsis line-clamp-2 pr-10">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500 text-sm sm:text-base">
                      {product?.productId?.category}
                    </p>

                    {/* Price */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 mt-2">
                      <p className="text-red-600 font-medium text-base sm:text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-base sm:text-lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        className="border border-red-500 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center"
                        onClick={() => decreaseQty(product?._id, product?.quantity)}
                      >
                        -
                      </button>
                      <p>{product?.quantity}</p>
                      <button
                        className="border border-red-500 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center"
                        onClick={() => increaseQty(product?._id, product?.quantity)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-2 xl:mt-0 w-full xl:max-w-sm xl:sticky xl:top-28 self-start">
          {loading ? (
            <div className="h-36 bg-slate-300 border border-slate-300 animate-pulse rounded-xl"></div>
          ) : (
            <div className="bg-white mb-0 rounded-xl overflow-hidden border border-slate-200">
              <h2 className="text-white bg-red-500 px-4 py-3 text-lg">Summary</h2>
              <div className="flex items-center justify-between px-4 pt-4 gap-2 font-medium text-base sm:text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>
              <div className="flex items-center justify-between px-4 py-3 gap-2 font-medium text-base sm:text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              <button className="text-white bg-blue-600 p-3 w-full">
                Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
