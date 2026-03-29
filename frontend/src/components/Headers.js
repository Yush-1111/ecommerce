import React, { useContext } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useState } from "react";
import ROLE from "../common/Role";
import Context from "../context";
import { clearAuthToken } from "../helpers/auth";

const Headers = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
 const navigate = useNavigate()
 const searchInput = useLocation()
 const urlSearch = new URLSearchParams(searchInput?.search)
const searchQuery = urlSearch.getAll("q") 
 const [search,setSearch] = useState(searchQuery)
 const normalizedRole = user?.role?.toUpperCase()



  const handleLogout = async()=>{
    const fatchData = await fetch(SummaryApi.logout_user.url,{
      method:SummaryApi.logout_user.method,
    })
    const data = await fatchData.json()
    if(data.success){
      clearAuthToken()
      toast.success(data.message)
      dispatch(setUserDetails(null))
      context?.fetchUserAddToCart()
      navigate("/")

    }
    if(data.error){
      toast.success(data.error)
    }
  }
  const handleSearch = (e)=>{
     const {value} = e.target
     setSearch(value)
     
     if(value){
      
      navigate(`/search?q=${value}`)

     }
     else{
      navigate("/search")
     }
  }
  return (
    <header className="shadow-md bg-white fixed top-0 left-0 w-full z-40">
      <div className="container mx-auto px-3 sm:px-4 py-2">
        <div className="flex items-center justify-between gap-3">
          <Link to={"/"}>
            <Logo w={88} h={48} />
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            {
              normalizedRole === ROLE.ADMIN && (
                <Link
                  to={"/admin-panel/all-products"}
                  className="hidden sm:block px-3 py-1.5 text-sm text-white rounded-full bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                >
                  Admin Panel
                </Link>
              )
            }

            <div className="relative flex justify-center ">

              {
                user?._id && (
              
            <div className="text-2xl sm:text-3xl cursor-pointer relative flex justify-center" onClick={()=>setMenuDisplay(preve => !preve)}>
              {
                user?.profilePic ? (
                <img src={user?.profilePic} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"alt={user?.name} />
              ):(
                <FaRegCircleUser />
              )
              
              }
            </div>
                )
              }
            {
              menuDisplay && (
                <div className="absolute right-0 bg-white min-w-[180px] h-fit p-2 top-11 shadow-lg rounded border" >
                <nav className="grid gap-1">
                  {
                    normalizedRole === ROLE.ADMIN && (
                      <Link to={"/admin-panel/all-products"} className="whitespace-nowrap hover:bg-slate-100 p-2 rounded" onClick={()=>setMenuDisplay(preve => !preve)}> Admin Panel</Link>

                    )
                  }
                </nav>
                
              </div>
              )
            }
          </div>

          {
            user?._id && (

          <Link to={"/cart"} className="text-xl sm:text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">{context?.cartProductCount}</p>
            </div>
          </Link>
            )
          }

          <div>
            {
              user?._id ?(
                <button onClick={handleLogout} className="px-3 py-1.5 text-sm sm:text-base text-white rounded-full bg-red-600 hover:bg-red-700 whitespace-nowrap">Logout</button>

              ):(
            <Link to={"/Login"} className="px-3 py-1.5 text-sm sm:text-base text-white rounded-full bg-red-600 hover:bg-red-700 whitespace-nowrap">Login </Link>

              )
            }
          </div>
        </div>
        </div>

        <div className="mt-2 flex items-center border rounded-full focus-within:shadow pl-3 bg-slate-50">
          <input
            type="text"
            placeholder="Search products here"
            className="w-full outline-none pl-1 pr-2 py-2 text-sm sm:text-base bg-transparent"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-base min-w-[42px] sm:min-w-[50px] h-10 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Headers;
