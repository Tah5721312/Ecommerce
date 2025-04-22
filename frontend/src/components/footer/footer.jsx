import { Box, Button, Typography } from '@mui/material';
 

const Footer = () => {
  return (
    <Box
    sx={{
     
      bgcolor: "#2B3445",
      py: 1.3,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    }}
  >
    <Typography
      justifyContent={"center"}
      display={"flex"}
      alignItems={"center"}
      color={"HighlightText"}
      variant="h6"
      sx={{ fontSize: { xs: "11px", sm: "18px" } }}
    >
      Designed and developed by
      <Button
          sx={{
            mx: 0.5,
            textTransform: "capitalize",
            color: "#ff7790",fontSize: { xs: "11px", sm: "18px" }
          }}
          variant="text"
          color="primary"
        >
          Mohamed Abdelftah
        </Button>
      ©2025
    </Typography>
  </Box>
  );
}

export default Footer;