import React, { useEffect, useState } from 'react'
import image1 from "../assest/banner/img1.webp"
import image2 from "../assest/banner/img2.webp"
import image3 from "../assest/banner/img3.jpg"
import image4 from "../assest/banner/img4.jpg"
import image5 from "../assest/banner/img5.webp"

import image1mobile from "../assest/banner/img1_mobile.jpg"
import image2mobile from "../assest/banner/img2_mobile.webp"
import image3mobile from "../assest/banner/img3_mobile.jpg"
import image4mobile from "../assest/banner/img4_mobile.jpg"
import image5mobile from "../assest/banner/img5_mobile.png"

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";



const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const destockImages = [
        image1,
        image2,
        image3,
        image4,
        image5,
    ]
    const mobileImages = [
        image1mobile,
        image2mobile,
        image3mobile,
        image4mobile,
        image5mobile,
    ]
    const nextImage =()=>{
        if(destockImages.length -1 > currentImage){
        setCurrentImage(preve => preve +1)
        }
    }
     const preveImage =()=>{
        if( currentImage !== 0){
        setCurrentImage(preve => preve -1)
        }
    }

    useEffect(()=>{
        const interval  = setInterval(()=>{
        if(destockImages.length -1 > currentImage){
          nextImage()
        }else{
            setCurrentImage(0)
        }
        },5000)
        return ()=> clearInterval(interval) 
    },[currentImage])


  return (
    <div className='container mx-auto px-4 rounded '>

    <div className='h-56 md:h-96 w-full bg-slate-200 relative'>

        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
            <div className=' flex justify-between text-2xl w-full'>

            <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
            <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
            </div>

        </div>

        {/* for destock and laptop using  */}

    <div className=' hidden md:flex h-full w-full overflow-hidden '>
    {
            destockImages.map((imageURl,index)=>{
                return(
                    <div className='w-full h-full min-h-full min-w-full transition-all' key={imageURl} style={{transform :`translateX(-${currentImage*100}%)`}}>

                    <img src={imageURl} className='w-full h-full object-cover' />
                    
              
                    </div>
                )
            })
        }
    </div>
{/* for mobile using */}

    <div className=' flex h-full w-full overflow-hidden md:hidden'>
    {
            mobileImages.map((imageURl,index)=>{
                return(
                    <div className='w-full h-full min-h-full min-w-full transition-all' key={imageURl} style={{transform :`translateX(-${currentImage*100}%)`}}>

                    <img src={imageURl} className='w-full h-full'/>
                    
              
                    </div>
                )
            })
        }
    </div>


     
    </div>
    </div>
  )
}

export default BannerProduct
