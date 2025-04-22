import { Fab, Zoom } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartFAB = ({ onClick }) => {
  return (
    <Zoom in={true}>
      <Fab
        onClick={onClick}
        color="primary"
        sx={{ position: "fixed", bottom: 33, left: 33, zIndex: 1200 }}
        aria-label="cart"
      >
        <ShoppingCartIcon />
      </Fab>
    </Zoom>
  );
};

export default CartFAB;
