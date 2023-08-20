import React,{useEffect} from "react";
import Sidebar from "./Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Reports from "./Diagnostic/Reports";
import { useNavigate } from "react-router-dom";
const Diagnostic = () => {
  const tab = useSelector((state) => state.sidebar.currtabD);
  let navigate = useNavigate();
  const loginInAs = useSelector(state=>state.login.loginas)
  useEffect(()=>{
    if(loginInAs!="diagnostic"){
      navigate("/login")
    }
  },[])
  return (
    <div>
      <Sidebar />
      <div style={{ padding: "20px" }}>
        <div style={{ overflowY: "scroll", height: "90vh" }}>
          <Reports />
        </div>
      </div>
    </div>
  );
};

export default Diagnostic;
