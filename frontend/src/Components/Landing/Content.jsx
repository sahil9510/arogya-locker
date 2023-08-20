import React from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

const Content = ({ info, source }) => {
  return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "3%",
          
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            margin: "3%",
          }}
        >
          <h4 style={{fontFamily: "'Lato', sans-serif", letterSpacing:"0.5px", lineHeight:"30px"}}>{info}</h4>
          {/* <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ width: "12rem" }}
          >
            Know more
          </Button> */}
        </div>
        <img src={source} alt="abhaNum" width="500px" height="320px" style={{borderRadius:"50%"}} />
      </div>
  );
};

export default Content;
