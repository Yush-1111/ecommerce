
import loginicons from "../assest/signin.gif"
import { FaEye } from "react-icons/fa";
import { useContext, useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from "../context";


const Login = () => {
const [showPassword , setPassword] = useState(false)
const [data , setData] = useState({
    email:"",
    password:"",

})
const navigate = useNavigate()
const {fetchUserDetails,fetchUserAddToCart} = useContext(Context)



const handleOnChange = (e)=>{
    const {name, value} = e.target

    setData((preve)=>{
        return{
            ...preve,
            [name]: value
        }
    })
}
const handleSubmit = async(e)=>{
    e.preventDefault()

    const dataResponse = await fetch(SummaryApi.signIn.url,{
    method:SummaryApi.signIn.method,
    credentials:"include",
    headers:{
     "Content-Type" : "application/json",
    },
    body: JSON.stringify(data),
    })
    const dataApi = await dataResponse.json()

    if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/")
        fetchUserDetails()
        fetchUserAddToCart()
       
    }
    if(dataApi.error){
        toast.error(dataApi.message)
    }
    

}
console.log("data login ", data)


  return (
    <section id='Login'>
        <div className='mx-auto container p-2'>
            <div className='bg-white p-2 py-5  w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto '>
                
              <img src={loginicons} alt=" login icons "></img>

                    </div>
                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email:</label>
                        <div className='bg-slate-200 p-2'>
                            <input type='email'
                             placeholder='enter email'
                             name='email'
                             value={data.email}
                             onChange={handleOnChange}
                             className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>
                    <div>
                        <label>Password:</label>
                        <div className='bg-slate-200 p-2 flex'> 
                            <input type={showPassword ?"text" :"password"} 
                            placeholder='enter password'
                            name='password'
                            value={data.password}
                            onChange={handleOnChange}
                            className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={()=>setPassword((preve)=>!preve)}>

                            <span>
                                {
                                    showPassword ?(

                                        <FaEye /> 
                                    )
                                    :
                                    (

                                        <FaEyeSlash />
                                    )
                                }

                            </span>
                            </div>
                        </div>
                        <Link to={"/forgot-password"} className=' block w-fit ml-auto hover:underline hover:text-red-600'>
                        Forgot Password
                        </Link>
                    </div>
                    <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 '> Login</button>
                </form>
                <p className='my-5'> Don't have account ? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'> sign up</Link> </p>
            </div>

        </div>


    </section>
  )
}

export default Login

