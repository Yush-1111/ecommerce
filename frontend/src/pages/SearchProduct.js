import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalCard from '../components/VerticalCard';

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products based on the query
  const fetchProduct = useCallback(async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search);
    const responseData = await response.json();
    setData(responseData.data || []);
    setLoading(false);
  }, [query.search]);

  // Fetch products whenever the query changes
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4">
      {loading && <p className="text-lg text-center">Loading....</p>}

      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <p className="text-base sm:text-lg font-semibold">Search Results: {data.length}</p>
      </div>

      {data.length === 0 && !loading && (
        <p className="bg-white text-base sm:text-lg p-4 rounded-xl text-center">
          No data found. Please check your search term.
        </p>
      )}

      {data.length !== 0 && !loading && <VerticalCard loading={loading} data={data} />}
    </div>
  );
};

export default SearchProduct;
