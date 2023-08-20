import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../store/sidebarslice";
import Doctors from "./Hospital/Doctors";
import { useNavigate } from "react-router-dom";
const Hospital = () => {
  const tab = useSelector((state) => state.sidebar.currtabH);
  let navigate = useNavigate();
  const loginInAs = useSelector(state=>state.login.loginas)
  useEffect(()=>{
    if(loginInAs!="hospital"){
      navigate("/login")
    }
  },[])
  return (
    <div>
      <Sidebar />
      <div style={{ padding: "20px" }}>
        <div style={{ overflowY: "scroll", height: "90vh" }}>
          {tab === "doctors" ? <Doctors /> : ""}
        </div>
      </div>
    </div>
  );
};

export default Hospital;
