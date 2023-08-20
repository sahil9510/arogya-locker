import React, { useEffect } from 'react'
import Sidebar from './Sidebar/Sidebar'
import { useState } from 'react';
import Table from './Patient/PresTable';
import { useDispatch,useSelector } from 'react-redux';
import Reports from './Patient/Reports';
import Myreports from './Doctors/Myreports';
import Mypatients from './Doctors/Mypatients'
import PDoctors from './Patient/PDoctors';
import {useNavigate} from "react-router-dom";

const Doctors = () => {
  const tab=useSelector(state=>state.sidebar.currtabD);
  let navigate = useNavigate();
  const loginInAs = useSelector(state=>state.login.loginas)
  useEffect(()=>{
    if(loginInAs!="doctors"){
      navigate("/login")
    }
  },[])

  return (
    <div>
        <Sidebar />
        <div style={{padding:"20px"}} >
        <div style={{ overflowY: "scroll", height: "90vh" }}>

        {tab==="patients"?<Mypatients/>:""}
        {tab==="reports"?<Myreports/>:""}
        </div>
        
        </div>
    </div>
  )
}

export default Doctors