import Login from "../src/Components/Login"
import Signup from './Components/Signup';
import { Routes, Route, useNavigate ,Navigate} from "react-router-dom";
import Landing from './Components/Landing/Landing';
import Navbar from './Components/Navbar';
import Patient from './Components/Patient';
import theme from "./Components/theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Doctors from "./Components/Doctors";
import {Toaster} from "react-hot-toast";
import Diagnostic from "./Components/Diagnostic";
import { useDispatch,useSelector } from "react-redux";
import { changeUser, changeloginas,changedata,changedoctors } from "./store/loginslice"
import Hospital from "./Components/Hospital";
import { useEffect } from "react";





function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  window.addEventListener('popstate',function(event){
        navigate('/')
        dispatch(changeUser(null))
        dispatch(changeloginas("None"))
        dispatch(changedata(null))
        dispatch(changedoctors(null))
  })
  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       autoDisplay: false
  //     },
  //     "google_translate_element"
  //   );
  // };
  // useEffect(() => {
  //   var addScript = document.createElement("script");
  //   addScript.setAttribute(
  //     "src",
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //   );
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = googleTranslateElementInit;
  // }, []);
  return (
    <div className="App">
      <div id="recaptcha-container"></div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/patient" element={<Patient />}></Route>
        <Route path="/doctors" element={<Doctors />}></Route>
        <Route path="/diagnostic" element={<Diagnostic/>}></Route>
        <Route path="/hospital" element={<Hospital/>}></Route>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{ duration: 4000 }}
      />
    </div>
  );
}

export default App;