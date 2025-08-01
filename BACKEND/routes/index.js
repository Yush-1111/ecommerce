const express = require("express")

const router = express.Router()

const userSignUpController  = require("../Controller/User/userSignUp")
const userSignInController = require("../Controller/User/userSignIn")
const userDetailsController = require("../Controller/User/userDetails")
const authToken = require("../middleware/authToken")
const userLogout = require("../Controller/User/userLogout")
const allUsers = require("../Controller/User/AllUsers")
const updateUser = require("../Controller/User/updateUser")
const UploadProductController = require("../Controller/product/UploadProduct")
const getProductController = require("../Controller/product/getProduct")
const updateProductController = require("../Controller/product/updateProduct")
const getCategoryProduct = require("../Controller/product/getCategoryProductOne")
const getCategoryWiseProduct = require("../Controller/product/getCategoryWiseProduct")
const getProductDetails = require("../Controller/product/getProductDetails")
const addToCardController = require("../Controller/User/addToCartController")
const countAddToCartProduct = require("../Controller/User/countAddToCartProduct")
const addToCartViewProduct = require("../Controller/User/addToCartViewProduct")
const updateAddToCartProduct = require("../Controller/User/updateAddToCartProduct")
const deleteAddToCartProduct = require("../Controller/User/deleteAddToCartProduct")
const searchProduct = require("../Controller/product/searchProduct")
const filterProductController = require("../Controller/product/filterProduct")


// user update
router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-users",allUsers)
router.post("/update-user",authToken,updateUser)

//upload product

router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

// user add to cart
router.post("/addToCart",authToken, addToCardController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-cart-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken, updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

module.exports = router