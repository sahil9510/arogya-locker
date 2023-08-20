import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { changeUser, changeloginas } from "../store/loginslice";
import Navbar from "./Navbar";
import theme from "./theme";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "./Loader";
import LoadingOverlay from "react-loading-overlay";
import { redirect } from "react-router-dom";
import home from "../Assets/home1.jpg";

export default function SignInSide() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let as = useSelector((state) => state.login.loginas);
  const [enableButton, setEnableButton] = useState(false);
  const [signup, setsignup] = useState({
    signupas: null,
    name: "",
    age: "",
    abhaid: "",
    phoneno: "",
    regno: "",
    specialization: "",
    address: "",
  });

  useEffect(() => {
    if (signup.signupas === "doctors") {
      setEnableButton((prevState) => {
        return (
          signup.abhaid.length === 14 &&
          signup.phoneno.length === 10 &&
          signup.regno.length != 0 &&
          signup.age.length != 0 &&
          signup.name.length != 0 && 
          signup.specialization.length !=0
        );
      });
    }else if(signup.signupas === "patient"){
      setEnableButton((prevState) => {
        return (
          signup.abhaid.length === 14 &&
          signup.phoneno.length === 10 &&
          signup.age.length != 0 &&
          signup.name.length != 0
        );
      });
    }else if(signup.signupas === "diagnostic"){
      setEnableButton((prevState) => {
        return (
          signup.abhaid.length === 14 &&
          signup.phoneno.length === 10 &&
          signup.address.length != 0 &&
          signup.name.length != 0
        );
      });
    }else if(signup.signupas === "hospital"){
      setEnableButton((prevState) => {
        return (
          signup.abhaid.length === 14 &&
          signup.phoneno.length === 10 &&
          signup.address.length != 0 &&
          signup.name.length != 0
        );
      });
    }else{
      setEnableButton(false);
    }
  }, [signup]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlesignup = async () => {
    // e.preventDefault();
    if (signup.signupas === "doctors") {
      const userDoct = {
        name: signup.name,
        abhaid: signup.abhaid,
        age: signup.age,
        phoneno: signup.phoneno,
        specialisation: signup.specialization,
        regno: signup.regno,
      };
      try {
        setIsLoading(true);
        const response = await axios.post(
          process.env.REACT_APP_API_URL+"/api/doctor/signup",
          userDoct
        );
        if (response.status === 201) {
          localStorage.setItem("abhaid", response.data.id);
          // dispatch(changeUser(signup.abhaid));
          // dispatch(changeloginas(signup.signupas));
          setIsLoading(false);
          navigate(`/login`);
          toast.success(`Signup Successful`);
        } else {
          setIsLoading(false);
          toast.error(response.data.message);
          throw new Error(response.data.message);
        }
      } catch (err) {
        setIsLoading(false);
        toast.error(err.response.data.message);
        setError(err.response.data.message);
        console.log(error);
      }
    } else if (signup.signupas === "patient") {
      const userDoct = {
        name: signup.name,
        abhaid: signup.abhaid,
        age: signup.age,
        phoneno: signup.phoneno,
      };
      try {
        setIsLoading(true);
        const response = await axios.post(
          process.env.REACT_APP_API_URL+"/api/patient/signup",
          userDoct
        );
        if (response.status === 201) {
          localStorage.setItem("abhaid", response.data.id);
          // dispatch(changeUser(signup.abhaid));
          // dispatch(changeloginas(signup.signupas));
          setIsLoading(false);
          navigate(`/login`);
          toast.success(`${signup.name} Signup Successful`);
        } else {
          setIsLoading(false);
          toast.error(response.data.message);
          throw new Error(response.data.message);
        }
      } catch (err) {
        setIsLoading(false);
        toast.error(err.response.data.message);
        setError(err.response.data.message);
        console.log(error);
      }
    } else if (signup.signupas == "diagnostic") {
      const userDoct = {
        name: signup.name,
        abhaid: signup.abhaid,
        phoneno: signup.phoneno,
        address: signup.address,
      };
      try {
        setIsLoading(true);
        const response = await axios.post(
          process.env.REACT_APP_API_URL+"/api/diagnostic/signup",
          userDoct
        );
        if (response.status === 201) {
          localStorage.setItem("abhaid", response.data.id);
          // dispatch(changeUser(signup.abhaid));
          // dispatch(changeloginas(signup.signupas));
          setIsLoading(false);
          navigate(`/login`);
          toast.success(`${signup.name} Signup Successful`);
        } else {
          setIsLoading(false);
          toast.error(response.data.message);
          throw new Error(response.data.message);
        }
      } catch (err) {
        setIsLoading(false);
        toast.error(err.response.data.message);
        setError(err.response.data.message);
        console.log(error);
      }
      // }else if (signup.signupas === "hospitals") {
    } else if (signup.signupas === "hospital") {
      const userDoct = {
        name: signup.name,
        abhaid: signup.abhaid,
        address: signup.address,
      };
      try {
        setIsLoading(true);
        const response = await axios.post(
          process.env.REACT_APP_API_URL+"/api/hospital/signup",
          userDoct
        );
        if (response.status === 201) {
          localStorage.setItem("abhaid", response.data.id);
          // dispatch(changeUser(signup.abhaid));
          // dispatch(changeloginas(signup.signupas));
          setIsLoading(false);
          navigate(`/login`);
          toast.success(`${signup.name} Signup Successful`);
        } else {
          setIsLoading(false);
          toast.error(response.data.message);
          throw new Error(response.data.message);
        }
      } catch (err) {
        setIsLoading(false);
        toast.error(err.response.data.message);
        setError(err.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <LoadingOverlay
      active={isLoading}
      spinner={<Loader />}
      styles={{
        wrapper: {},
        overlay: {
          position: "fixed",
          top: "0px",
          left: "0px",
          height: "100%",
          width: " 100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {},
        spinner: {},
      }}
    >
      <ThemeProvider theme={theme} height="100%">
        <Grid container component="main" sx={{ height: "90vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            // component={Paper}
            elevation={6}
            // square
            // height="90vh"
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "20px",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Sign Up as:
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Age"
                    autoWidth
                    sx={{ height: "48px" }}
                    value={signup.signupas}
                    onChange={(e) => {
                      setsignup({ ...signup, signupas: e.target.value });
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"hospital"}>Hospital</MenuItem>
                    <MenuItem value={"doctors"}>Doctor/Clinic</MenuItem>
                    <MenuItem value={"diagnostic"}>Diagnostic</MenuItem>
                    <MenuItem value={"patient"}>Patient</MenuItem>
                  </Select>
                  <br />
                  <InputLabel>Enter your Abha Id No:</InputLabel>
                  <TextField
                    margin="normal"
                    required
                    label="Enter Your Abha Id No"
                    type="text"
                    id="adhno"
                    // size="small"
                    inputProps={{
                      maxLength: 14,
                      minlength: 14,
                      sx: { height: "15px" },
                    }}
                    onChange={(e) => {
                      setsignup({ ...signup, abhaid: e.target.value });
                    }}
                  />
                  <InputLabel>Enter your Name</InputLabel>
                  <TextField
                    margin="normal"
                    required
                    label="Name"
                    type="text"
                    id="adhno"
                    inputProps={{ sx: { height: "15px" } }}
                    onChange={(e) => {
                      setsignup({ ...signup, name: e.target.value });
                    }}
                  />
                  {signup.signupas == "doctors" ||
                  signup.signupas == "patient" ? (
                    <>
                      <InputLabel>Enter your Age:</InputLabel>
                      <TextField
                        margin="normal"
                        required
                        label="Age"
                        type="number"
                        id="adhno"
                        inputProps={{ maxLength: 10, sx: { height: "15px" } }}
                        onChange={(e) => {
                          setsignup({ ...signup, age: e.target.value });
                        }}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  <InputLabel>Enter your Phone No:</InputLabel>
                  <TextField
                    margin="normal"
                    required
                    label="Phone No"
                    type="number"
                    id="adhno"
                    inputProps={{ maxLength: 10, sx: { height: "15px" } }}
                    onChange={(e) => {
                      setsignup({ ...signup, phoneno: e.target.value });
                    }}
                  />
                  {(signup.signupas == "diagnostic" ||
                    signup.signupas == "hospital") && (
                    <>
                      <InputLabel>Enter Address:</InputLabel>
                      <TextField
                        margin="normal"
                        required
                        label="Address"
                        type="text"
                        onChange={(e) => {
                          setsignup({
                            ...signup,
                            address: e.target.value,
                          });
                        }}
                      />
                    </>
                  )}
                  {signup.signupas == "doctors" ? (
                    <>
                      <InputLabel>Enter Registration No:</InputLabel>
                      <TextField
                        margin="normal"
                        required
                        label="Registration No"
                        type="text"
                        id="adhno"
                        inputProps={{ sx: { height: "15px" } }}
                        onChange={(e) => {
                          setsignup({ ...signup, regno: e.target.value });
                        }}
                      />
                      <InputLabel>Enter Specialisation:</InputLabel>
                      <TextField
                        margin="normal"
                        required
                        label="Like Radiology"
                        type="text"
                        inputProps={{ sx: { height: "15px" } }}
                        onChange={(e) => {
                          setsignup({
                            ...signup,
                            specialization: e.target.value,
                          });
                        }}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <Button
                  fullWidth
                  onClick={handlesignup}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!enableButton}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link
                      href="https://healthid.ndhm.gov.in/register"
                      variant="body2"
                    >
                      {"Don't have an ABHA id? Create Here!"}
                    </Link>
                  </Grid>
                </Grid>
                {/* <Copyright sx={{ mt: 5 }} /> */}
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${home})`,
              // "url(https://newsonair.gov.in/writereaddata/News_Pictures/MIS/2020/Dec/NPIC-2020121573020.png)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      </ThemeProvider>
    </LoadingOverlay>
  );
}
