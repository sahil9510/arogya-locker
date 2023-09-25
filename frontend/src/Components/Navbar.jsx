import {React, useEffect } from "react";
import "./CSS/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import companyLogo from "../Assets/healthlogo.png";
import alLogo from "../Assets/alllogo2.png";
import name from "../Assets/text.png";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUser,
  changeloginas,
  changedata,
  changedoctors,
} from "../store/loginslice";



const Navbar = () => {
  const loginas = useSelector((state) => state.login.loginas);
  const userid = useSelector((state) => state.login.curruser);
  const alldata = useSelector((state) => state.login.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goHome = () => {
    navigate("/");
    dispatch(changeUser(null));
    dispatch(changeloginas("None"));
    dispatch(changedata(null));
    dispatch(changedoctors(null));
  };

  

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo1">
          <div style={{ cursor: "pointer" }} onClick={goHome}>
            <img className="logo2" src={alLogo} alt="home" />
            <img className="text" src={name} alt="home" />
          </div>
          <img className="logo" src={companyLogo} alt="flipkart" />
        </div>
        <div className="menu-icon"></div>
        {loginas == "none" || userid == null ? (
          <>
            <div className={`nav-elements`}>
              <ul>
                <li>
                  <NavLink to="/signup">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                {/* <li>
                  <div id="google_translate_element"></div>
                </li> */}
              </ul>
            </div>
          </>
        ) : (
          <>
            <Box
              sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
            >
              {alldata.name}
              <IconButton
                sx={{ fontSize: 40 }}
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </>
        )}
        {/* <div id="google_translate_element"></div> */}
      </div>
    </div>
  );
};

export default Navbar;