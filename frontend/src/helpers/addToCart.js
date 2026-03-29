
import {toast} from "react-toastify"
import SummaryApi from "../common"
import { getAuthHeaders } from "./auth"


const addToCard = async(e,id)=>{
 e?.stopPropagation()
 e?.preventDefault()

 const response = await fetch(SummaryApi.addToCart.url,{
    method:SummaryApi.addToCart.method,
    headers:getAuthHeaders({
      "Content-Type":"application/json"
    }),
    body:JSON.stringify(
        {productId :id}
    )
 })
 const dataResponse = await response.json()
 
 if(dataResponse.success){
    toast.success(dataResponse.message) 
 }
 if(dataResponse.error){
    toast.error(dataResponse.message)
 }
 return dataResponse
}
export default addToCard
