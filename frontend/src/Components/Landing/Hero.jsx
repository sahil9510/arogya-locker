import * as React from "react";
import { Box, ThemeProvider, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import landingImg from "../../Assets/landing.png";
import landingImg from "../../Assets/secc.svg";
import { Link } from "react-router-dom";
import "../CSS/Landing.css"
import theme from "../theme";

export default function Hero({
  decorative = "All-in-One",
  title = "Arogya Locker by Flipkart Health+",
  subtitle = "A terminal, editor, screenshot tool, file explorer, and database GUI, all—of course—powered by artificial intelligence.",
}) {
  return (
    // <div style={{ display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        flex: 1,
        //   width: "100%",
        height: "60vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        textAlign: "center",
        padding: "2%",
        margin: "2%",
        my: 2,
        backgroundColor: "#FFF6d2",
        borderRadius:"9px"
      }}
    >
      <Box
        sx={{
          //   flex: 1,
          height: "60vh",
          width: "50%",
          display: "flex",
          padding: "2%",
          flexDirection: "column",
          textAlign: "left",
          my: 2,
          borderRadius:"9px"
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "4xl", sm: "5xl", md: "6xl" },
            fontWeight: 700,
            margin: "auto",
            width: "100%",
          }}
        >
          {title}
        </Typography>
        <Stack spacing={8} direction="row">
          <Link to="/signup">
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ width: "12rem" }}
            >
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outlined" size="large" sx={{ width: "12rem" }}>
              Login
            </Button>
          </Link>
        </Stack>
      </Box>

      <Box
        sx={{
          height: "60vh",
          display: "flex",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img src={landingImg} alt="Loading" style={{ height: "50vh", width:"100%"}} id="show" />
      </Box>
    </Box>
    </ThemeProvider>
    // </div>
  );
}
