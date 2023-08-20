import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { useState ,useEffect} from 'react';
import Table from './Patient/PresTable';
import { useDispatch,useSelector } from 'react-redux';
import { changeTab } from '../store/sidebarslice';
import Reports from './Patient/Reports';
import Documents from './Patient/Documents';
import PDoctors from './Patient/PDoctors';
import {useNavigate} from "react-router-dom";
const Patient = () => {
  const tab=useSelector(state=>state.sidebar.currtabP);
  let navigate = useNavigate();
  const loginInAs = useSelector(state=>state.login.loginas)
  useEffect(()=>{
    if(loginInAs!="patient"){
      navigate("/login")
    }
  },[])
  return (
    <div>
      <Sidebar />
      <div style={{ padding: "20px" }}>
        <div style={{ overflowY: "scroll", height: "90vh" }}>
          {tab === "prescriptions" ? <Table /> : ""}
          {tab === "reports" ? <Reports /> : ""}
          {tab === "documents" ? <Documents /> : ""}
          {tab === "doctors" ? <PDoctors /> : ""}
        </div>
      </div>
    </div>
  );
};

export default Patient;
