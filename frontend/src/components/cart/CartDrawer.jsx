import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Stack,
  Button,
  Slide,
  Tooltip,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Close,
  Delete,
  ShoppingCart,
  Add,
  Remove,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../Redux/cartSlice";

const CartDrawer = ({ open, onClose, cartSource }) => {
  // @ts-ignore
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const total = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    if (open) {
      setSlideIn(true);
      if (cartSource !== "icon") {
        const timer = setTimeout(() => {
          setSlideIn(false);
          setTimeout(() => {
            onClose();
          }, 500);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } else {
      setSlideIn(false);
    }
  }, [open, onClose, cartSource]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Slide direction="left" in={slideIn} timeout={500}>
        <Box
          sx={{
            width: isMobile ? "100vw" : 750,
            p: isMobile ? 2 : 3,
            position: "relative",
            direction: "ltr",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              ":hover": { color: "red" },
            }}
          >
            <Close />
          </IconButton>

          {/* Title */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", mb: 3 }}
          >
            <ShoppingCart
              sx={{ fontSize: 32, mr: 1, verticalAlign: "middle" }}
            />
            Shopping Cart
          </Typography>

          <Divider sx={{ mb: 3, borderBottom: "1px solid #ddd" }} />

          {/* Empty Cart */}
          {cartItems.length === 0 ? (
            <Typography>The cart is empty...</Typography>
          ) : (
            <Box>
              {/* Header Row */}
              <Box
                sx={{
                  display: "flex",
                  textAlign: "center",
                  mb: 2,
                  px: 1,
                  fontWeight: "bold",
                }}
              >
                <Typography sx={{ flex: 0.2, textAlign: "left" }}>
                  Image
                </Typography>
                <Typography sx={{ flex: 0.2 }}>Name</Typography>
                <Typography sx={{ flex: 0.19 }}>Quantity</Typography>
                <Typography sx={{ flex: 0.2 }}>Price</Typography>
                <Typography sx={{ flex: 0.2 }}>Remove</Typography>
              </Box>
              <Divider sx={{ borderBottom: "1px solid #ddd" }} />

              {/* Items */}
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{ borderBottom: "1px solid #ddd", py: 1, px: 1 }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {/* Image */}
                    <Box sx={{ flex: 0.2 }}>
                      <img
                        // @ts-ignore
                        src={`${import.meta.env.VITE_BASE_URL}${
                          item.productimg[0]?.url
                        }`}
                        alt={item.productTitle}
                        style={{
                          width: isMobile ? 40 : 50,
                          height: isMobile ? 40 : 50,
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                    </Box>

                    {/* Name */}
                    <Typography
                      sx={{
                        flex: 0.2,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        textAlign: "center",
                      }}
                    >
                      {item.productTitle}
                    </Typography>

                    {/* Quantity */}
                    <Stack
                      sx={{ flex: 0.2 }}
                      direction="row"
                      alignItems="center"
                    >
                      <IconButton
                        color="primary"
                        onClick={() => dispatch(increaseQuantity(item))}
                      >
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
                        {item.quantity}
                      </Box>
                      <IconButton
                        color="primary"
                        onClick={() => dispatch(decreaseQuantity(item))}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                    </Stack>

                    {/* Price */}
                    <Typography
                      sx={{ flex: 0.2, textAlign: "center" }}
                      variant="body2"
                    >
                      ${item.productPrice.toFixed(2)}
                    </Typography>

                    {/* Remove */}
                    <Box sx={{ flex: 0.2, textAlign: "center" }}>
                      <Tooltip title="Remove item">
                        <IconButton
                          color="error"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                </Box>
              ))}

              {/* Clear Cart Button */}
              <Box sx={{ textAlign: "center",mt:2 }}>
                <Button
                  color="error"
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </Button>
              </Box>

              {/* Checkout + Total + Payment Icons */}
              <Box sx={{ mt: 3 }}>
                <Stack
                  direction={isMobile ? "column" : "row"}
                  spacing={2}
                  alignItems={isMobile ? "stretch" : "center"}
                >
                <Box sx={{ textAlign: "center" }}>
                    <Button
                      // fullWidth={isMobile}
                      color="secondary"
                      variant="contained"
                      sx={{ fontSize: isMobile ? 13 : 15 }}
                    >
                      Checkout
                    </Button>
                </Box>
          
                  <Typography
                    mt={isMobile ? 1 : 2}
                    fontSize={isMobile ? 20 : 25}
                    fontWeight={600}
                    textAlign={isMobile ? "center" : "left"}
                  >
                    Total: ${total.toFixed(2)}
                  </Typography>
                </Stack>

                <Stack direction="row" mt={2} spacing={1}  justifyContent={isMobile ? "center" : "flex-start"} >
                  <img
                    src="../../../public/images/visa.png"
                    alt="Visa"
                    style={{ height: isMobile ? 20 : 25 }}
                  />
                  <img
                    src="../../../public/images/mastercard.png"
                    alt="Mastercard"
                    style={{ height: isMobile ? 20 : 25 }}
                  />
                  <img
                    src="../../../public/images/paypal.png"
                    alt="PayPal"
                    style={{ height: isMobile ? 20 : 25 }}
                  />
                </Stack>
              </Box>
            </Box>
          )}
        </Box>
      </Slide>
    </Drawer>
  );
};

export default CartDrawer;
