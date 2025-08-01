import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontialCardProduct from '../components/HorizontialCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontialCardProduct category={"airpodes"} heading={"Top's airpodes"}/>

      <HorizontialCardProduct category={"camera"} heading={"Top's Camera"}/>

      <VerticalCardProduct category={"mobiles"} heading={"Top's Mobiles"}/>
      <VerticalCardProduct category={"earphones"} heading={"Top's Earphones"}/>
      <VerticalCardProduct category={"mouse"} heading={"Top's Mouse"}/>
      <VerticalCardProduct category={"speakers"} heading={"Top's Speaker"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Top's Trimmers"}/>
      <VerticalCardProduct category={"printers"} heading={"Top's Printers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Top's Refrigerator"}/>
      <VerticalCardProduct category={"televisions"} heading={"Top's Television"}/>
      <VerticalCardProduct category={"processor"} heading={"Top's Processor"}/>
      <VerticalCardProduct category={"watches"} heading={"Top's Watches"}/>

    </div>
  )
}

export default Home
