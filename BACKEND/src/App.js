import './App.css';
import Headers from './components/Headers';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { ToastContainer, } from 'react-toastify';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';




function App() {
  const dispatch = useDispatch()
  const [ cartProductCount, setCartProductCount] = useState(0)
const fetchUserDetails = async()=>{
  const dataResponse = await fetch(SummaryApi.current_user.url,{
    method:SummaryApi.current_user.method,
    credentials:"include",
    
     
     
     })
       const dataApi = await dataResponse.json()
        if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      
  }
   
 
}

const fetchUserAddToCart = async()=>{
  const dataResponse = await fetch(SummaryApi.countAddToCartProduct.url,{
    method:SummaryApi.countAddToCartProduct.method,
    credentials:"include",
    
     
     
     })
       const dataApi = await dataResponse.json()
       setCartProductCount(dataApi?.data?.count)
  
}

 useEffect(()=>{
    //  fetch user details
  fetchUserDetails()
    
  // fetch user details cart product
  fetchUserAddToCart()

 },[])

  return (
    <>
   <Context.Provider value={{
    fetchUserDetails,//fetch user details 
    cartProductCount,//fetch user details in add to cart product 
    fetchUserAddToCart,

   }}>
   <ToastContainer 
   position='top-center'
   
   />
   

      <Headers/>
    <main className='min-h-[calc(100vh-110px)] pt-16'>
    <Outlet/>
    </main>
    <Footer/>
   </Context.Provider>
    
    </>
  );
}

export default App;
