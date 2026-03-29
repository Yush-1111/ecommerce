import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Headers from './components/Headers';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState, useCallback } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { clearAuthToken, getAuthHeaders, getAuthToken } from './helpers/auth';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = useCallback(async () => {
    const token = getAuthToken();

    if (!token) {
      dispatch(setUserDetails(null));
      return;
    }

    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      headers: getAuthHeaders(),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
      return;
    }

    clearAuthToken();
    dispatch(setUserDetails(null));
  }, [dispatch]);

  const fetchUserAddToCart = useCallback(async () => {
    const token = getAuthToken();

    if (!token) {
      setCartProductCount(0);
      return;
    }

    const dataResponse = await fetch(SummaryApi.countAddToCartProduct.url, {
      method: SummaryApi.countAddToCartProduct.method,
      headers: getAuthHeaders(),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      setCartProductCount(dataApi?.data?.count || 0);
      return;
    }

    setCartProductCount(0);
  }, []);

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [fetchUserDetails, fetchUserAddToCart]);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
          limit={1}
          style={{
            maxWidth: '400px',
            fontSize: '14px',
            borderRadius: '8px',
          }}
        />

        <Headers />
        <main className="min-h-[calc(100vh-120px)] pt-28 sm:pt-24">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
