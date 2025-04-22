import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, Stack } from "@mui/material";
import { removeFromCart, clearCart } from "../../Redux/cartSlice";

const Cart = () => {
  // @ts-ignore
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const total = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={2}>Shopping Cart</Typography>

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Box key={item.id} sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6">{item.productTitle}</Typography>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                  <Typography variant="body2">Price: ${item.productPrice}</Typography>
                </Box>
                <Button color="error" onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}

          <Box mt={3}>
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            <Button variant="contained" color="error" onClick={() => dispatch(clearCart())} sx={{ mt: 2 }}>
              Clear Cart
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
