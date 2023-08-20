import React from "react";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast} from "react-hot-toast";
import Modal from "@mui/material/Modal";
import OtpInput from "otp-input-react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import {setph,setotp,setotpv} from '../store/otpslice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import theme from "./theme";
import { changeUser, changeloginas } from "../store/loginslice";






const Otpmodal = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const ph=useSelector(state=>state.otp.ph);
  const otpv=useSelector(state=>state.otp.otpv);
  const otp=useSelector(state=>state.otp.otp);
  let as = useSelector((state) => state.login.loginas);

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
  function onSignup() {
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+91" + ph;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        dispatch(setotpv(true));
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function onOTPVerify() {
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        dispatch(setotpv(false));
        dispatch(changeUser("434892734"));
        navigate(`/${as}`);
        toast.success(`Logged in as ${as}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Modal
          open={otpv}
          onClose={() => dispatch(setotpv(false))}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter OTP
            </Typography>
            <OtpInput
              style={{ padding: "20px" }}
              value={otp}
              onChange={()=>dispatch(setotp)}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container "
            ></OtpInput>
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
      </ThemeProvider>
    </div>
  );
};

export default Otpmodal;
