import React, { useEffect, useState, useCallback } from 'react'
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

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const destockImages = [image1, image2, image3, image4, image5]
    const mobileImages = [image1mobile, image2mobile, image3mobile, image4mobile, image5mobile]

    // Next image function
    const nextImage = useCallback(() => {
        setCurrentImage(prev => (prev < destockImages.length - 1 ? prev + 1 : 0))
    }, [destockImages.length])

    // Previous image function
    const prevImage = () => {
        setCurrentImage(prev => (prev > 0 ? prev - 1 : destockImages.length - 1))
    }

    // Auto slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(nextImage, 5000)
        return () => clearInterval(interval)
    }, [nextImage])

    return (
        <div className='container mx-auto px-3 sm:px-4 rounded'>
            <div className='h-48 sm:h-56 md:h-80 lg:h-96 w-full bg-slate-200 relative overflow-hidden rounded-2xl'>

                {/* Navigation Buttons for Desktop */}
                <div className='absolute z-10 h-full w-full md:flex items-center hidden px-3'>
                    <div className='flex justify-between text-2xl w-full'>
                        <button onClick={prevImage} className='bg-white/90 shadow-md rounded-full p-2'>
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className='bg-white/90 shadow-md rounded-full p-2'>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/* Desktop Banner */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {destockImages.map((imageURl, index) => (
                        <div
                            className='w-full h-full min-h-full min-w-full transition-all'
                            key={imageURl}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img
                                src={imageURl}
                                alt={`Banner ${index + 1}`}
                                className='w-full h-full object-cover'
                            />
                        </div>
                    ))}
                </div>

                {/* Mobile Banner */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {mobileImages.map((imageURl, index) => (
                        <div
                            className='w-full h-full min-h-full min-w-full transition-all'
                            key={imageURl}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img
                                src={imageURl}
                                alt={`Mobile Banner ${index + 1}`}
                                className='w-full h-full object-cover'
                            />
                        </div>
                    ))}
                </div>

                <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2'>
                    {mobileImages.map((_, index) => (
                        <span
                            key={index}
                            className={`h-2.5 rounded-full transition-all ${currentImage === index ? 'w-6 bg-white' : 'w-2.5 bg-white/60'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BannerProduct
