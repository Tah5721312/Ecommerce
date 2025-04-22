// @ts-nocheck
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import  { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "../../Redux/cartSlice";
import { Add, Remove } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
// import './ProductDetails.css';


const ProductDetails = ({clickedProduct}) => {
  // console.log(clickedProduct);

  const [selectedImg, setselectedImg] = useState(0);
  const dispatch = useDispatch();

// @ts-ignore
const cartItems = useSelector((state) => state.cart.cartItems);

const isInCart = (product) => {
  return cartItems.some((item) => item.id === product.id);
};

const productQuantity = (product) => {
  const found = cartItems.find((item) => item.id === product.id);
  return found ? found.quantity : 0;
};



  if (!clickedProduct || !clickedProduct.productimg?.length) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        flexDirection: { xs: "column", sm: "row" }, mt: { xs: 5, sm: 0 } 

      }}
    >

      <Box sx={{display: "flex"}}>
        <img width={300} className="main-img"
        src={`${import.meta.env.VITE_BASE_URL}${clickedProduct.productimg[selectedImg].url}`} alt="" />
      </Box>

      <Box sx={{py:2,textAlign: {xs: "center", sm: "left"}}}  >
        <Typography variant="h5">{clickedProduct.category}</Typography>
        <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h6">
        {clickedProduct.productPrice}
        </Typography>
        <Typography variant="body1">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>

        <Stack sx={{justifyContent: {xs: "center", sm: "left"}}} direction={"row"} gap={1} my={2}>
      
      
                 <ToggleButtonGroup
                 value={selectedImg}
                 exclusive
                 sx={{
                  ".Mui-selected": {
                    border: "1px solid rgba(233, 69, 96, 0.5) !important",
                    borderRadius:"5px !important",
                    opacity:"1",background:"initial"
                  },
                }}
                  >
               {clickedProduct.productimg.map((img, index) => (
                
                    <ToggleButton sx={{width:"110px",height:"110px",opacity:"0.5",p:"0",mx:1}} 
                                 key={index} value={index} >
                       <img
                          // className={`thumb-img ${selectedImg === index ? "active" : ""}`}
                          onClick={() => setselectedImg(index)}
                          style={{ borderRadius: 3 }}
                          height={"100%"}
                          width={"100%"}
                          src={`${import.meta.env.VITE_BASE_URL}${img.url}`}
                          alt={`product-img-${index}`}
                        />
                     </ToggleButton>
                ))}

               </ToggleButtonGroup>
              
                    
                



        </Stack>

        {isInCart(clickedProduct) ? (
  <Stack direction="row" alignItems="center" justifyContent={{xs: "center", sm: "start"}} gap={1}>
    <IconButton color="primary" onClick={() => dispatch(increaseQuantity(clickedProduct))}>
      <Add fontSize="small" />
    </IconButton>

    <Box
      sx={{
        width: 30,
        textAlign: "center",
        fontWeight: "bold",
        color: "primary.main",
      }}
    >
      {productQuantity(clickedProduct)}
    </Box>

    <IconButton color="primary" onClick={() => dispatch(decreaseQuantity(clickedProduct))}>
      <Remove fontSize="small" />
    </IconButton>
  </Stack>
) : (
  <Button
    onClick={() => dispatch(addToCart(clickedProduct))}
    sx={{ mb: { xs: 1, sm: 1 }, textTransform: "capitalize" }}
    variant="contained"
  >
    <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
    Add to cart
  </Button>
)}

      </Box>
    </Box>
  );
};

export default ProductDetails;