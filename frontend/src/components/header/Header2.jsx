import {  ExpandMore, Person2Outlined, ShoppingCartOutlined } from '@mui/icons-material';
import {  Container, IconButton, InputBase, ListItem, Stack, styled, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useSelector } from "react-redux";
import CartDrawer from "../cart/CartDrawer"; // المسار حسب مكان الملف عندك



const Search = styled('div')(({ theme }) => ({
  flexGrow:0.4 ,
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15)
  border:"1px solid #777"
  ,'&:hover': {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
      border:"1px solid #333"
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "266px",
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: "330px",
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color:"#777"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const options = ['All Categories','Car ','Clothes','Electronics'];

const Header2 = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event,index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

const theme =useTheme();
const [isCartOpen, setIsCartOpen] = useState(false);
const [cartSource, setCartSource] = useState(""); // "button" or "icon"

// @ts-ignore
const cartItems = useSelector((state) => state.cart.cartItems);   //{جلب عدد المنتجات من Redux}

  return (
    <Container sx={{my:2 ,display:"flex",justifyContent:"space-between"}}>
      
<Stack sx={{ display: { xs: "none", sm: "block" } }} alignItems={"center"}>
  <ShoppingCartOutlined />
  <Typography variant='body2'>    E-Commerce  </Typography>
</Stack>

<Search sx={{borderRadius:"22px",display:"flex", justifyContent: "space-between",}}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search ya tah…"
        inputProps={{ 'aria-label': 'search' }}
      />

   <List
        component="nav"
        aria-label="Device settings"
        sx={{ 
          // @ts-ignore
          bgcolor: theme.palette.myColor.main,
          borderBottomRightRadius: 22,
          borderTopRightRadius: 22,
          p: "0",
        }}
      >
        <ListItem
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText className='MuiListItemButton1'
          // className='border' 
            // primary="When device is locked"
          sx={{width:93 ,textAlign:"center" , "&:hover": { cursor: "pointer" },}}
            secondary={options[selectedIndex]}
          />
          <ExpandMore sx={{ fontSize: "16px" }}/>
        </ListItem>
      </List>
      <Menu 
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem 
            sx={{fontSize:"13px"}}
            key={option}
            // disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>


</Search>

<Stack direction={"row"} alignItems={"center"}>
  <IconButton aria-label="cart" onClick={() => {setIsCartOpen(true);
                                               setCartSource("icon"); }}>                        
        <StyledBadge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
  </IconButton>
  <IconButton>  <Person2Outlined />  </IconButton>  
</Stack>

<CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} cartSource={cartSource}/>


    </Container>
  );
}

export default Header2;
