import * as React from "react";
import { useState, useRef } from "react";
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
import { ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { changeUser, changedata, changeloginas } from "../store/loginslice";
import theme from "./theme";
import { setph, setotp, setotpv } from "../store/otpslice";
import { toast } from "react-hot-toast";
import axios from "axios";
import Loader from "./Loader";
import LoadingOverlay from "react-loading-overlay";
import block from "../Assets/home1.jpg";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Modal from "@mui/material/Modal";
import OtpInput from "otp-input-react";

export default function SignInSide() {
  const [curruser, setcurruser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enableButton, setEnableButton] = useState(false);
  const phRef = useRef();
  const abRef = useRef();
  const asRef = useRef();
  //Redux
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let as = useSelector((state) => state.login.loginas);

  const [ph, setph] = useState("");
  const [otpv, setotpv] = useState(false);
  const [otp, setotp] = useState("");
  console.log(otp);

  const initlog = useSelector((state) => state.login.loginas);
  const verify = () => {
    if (asRef.current.value !== "None") {
      setEnableButton((prevState) => {
        return (
          abRef.current.value.length === 14 && phRef.current.value.length === 10
        );
      });
    } else {
      setEnableButton(false);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // const alldata = useSelector((state) => state.login.data);
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }
  const onSignup= async()=>{
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+91" + ph;
    console.log(formatPh);
    try {
      const confirmationResult=await signInWithPhoneNumber(auth, formatPh, appVerifier);
        window.confirmationResult = confirmationResult;
        setotpv(true);
        toast.success("OTP sended successfully!");
    } catch (error) {
      console.log(error);
    }
  }
  function onOTPVerify() {
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setotpv(false);
        navigate(`/${as}`);
        toast.success(`Logged in as ${as}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handlelogin = async (e) => {
    e.preventDefault();
    if (as === "doctors") {
      const userDoctor = { abhaid: curruser };
      try {
        setIsLoading(true);
        const response = await axios.post(
          process.env.REACT_APP_API_URL+"/api/doctor/signin",
          userDoctor
        );
        if (response.status === 200) {

          setIsLoading(false);
          await onSignup();
          dispatch(changedata(response.data));
          dispatch(changeUser(response.data.id));

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
    } else if (as === "patient") {
      const userDoct = { abhaid: curruser };
      try {
        setIsLoading(true);
        const response = await axios.post(
          process.env.REACT_APP_API_URL+"/api/patient/signin",
          userDoct
        );
        console.log(response.status);
        if (response.status === 200) {
          setIsLoading(false);
          await onSignup();
          dispatch(changedata(response.data));
          dispatch(changeUser(response.data.id));
          
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
    } else if (as === "diagnostic") {
      const userDoct = { abhaid: curruser };
      try {
        setIsLoading(true);
        const response = await axios.post(
          process.env.REACT_APP_API_URL+"/api/diagnostic/signin",
          userDoct
        );
        if (response.status === 200) {
          setIsLoading(false);
          await onSignup();
          dispatch(changedata(response.data));
          dispatch(changeUser(response.data.id));

        } else {
          setIsLoading(false);
          toast.error(response.data.message);
          throw new Error(response.data.message);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message);
        setError(error.response.data.message);
        console.log(error);
      }
    } else if (as === "hospital") {
      const userDoctor = { abhaid: curruser };
      try {
        setIsLoading(true);
        const response = await axios.post(
          process.env.REACT_APP_API_URL+"/api/hospital/signin",
          userDoctor
        );
        if (response.status === 200) {
          setIsLoading(false);
          await onSignup();
          dispatch(changedata(response.data));
          dispatch(changeUser(response.data.id));
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

  // if (isLoading) {
  //   return <Loader />;
  // }

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
      <ThemeProvider theme={theme}>
        <Modal
          open={otpv}
          onClose={()=>setotpv(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter OTP
            </Typography>
            <OtpInput
              value={otp}
              onChange={setotp}
              OTPLength={6}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, mb: 2, ml: 15 }}
              onClick={() => onOTPVerify()}
            >
              {" "}
              Submit
            </Button>
          </Box>
        </Modal>
        <Grid container component="main" sx={{ height: "90vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${block})`,
              // "url(https://newsonair.gov.in/writereaddata/News_Pictures/MIS/2020/Dec/NPIC-2020121573020.png)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "90vh",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Login as:
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Age"
                    fullWidth
                    value={initlog}
                    onChange={(e) => {
                      verify();
                      dispatch(changeloginas(e.target.value));
                    }}
                    inputRef={asRef}
                  >
                    <MenuItem value="None">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"hospital"}>Hospital</MenuItem>
                    <MenuItem value={"doctors"}>Doctor/Clinic</MenuItem>
                    <MenuItem value={"diagnostic"}>Diagnostic</MenuItem>
                    <MenuItem value={"patient"}>Patient</MenuItem>
                  </Select>
                  {/* <FormHelperText>With label + helper text</FormHelperText> */}
                  {}
                  <TextField
                    margin="normal"
                    required
                    name="password"
                    label="Enter Your ABHA id"
                    type="text"
                    id="abhaid"
                    inputProps={{ maxLength: 14 }}
                    onChange={(e) => {
                      verify();
                      setcurruser(e.target.value);
                    }}
                    inputRef={abRef}
                  />
                  <TextField
                    margin="normal"
                    required
                    name="phoneno"
                    label="Enter Your Phone no"
                    type="number"
                    id="phoneno"
                    inputProps={{ maxLength: 10 }}
                    onChange={(e) => {
                      verify();
                      setph(e.target.value);
                    }}
                    inputRef={phRef}
                  />
                  
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    // onClick={()=>onSignup()}
                    onClick={handlelogin}
                    disabled={!enableButton}
                  >
                    Login
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link href="./signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  {/* <Copyright sx={{ mt: 5 }} /> */}
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </LoadingOverlay>
  );
}
