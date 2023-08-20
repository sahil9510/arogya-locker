import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Cardd from "./Card"
import img1 from "../../Assets/group.png";
import img3 from "../../Assets/doc.png";
import img2 from "../../Assets/hos.png";

const t1="For Citizens";
const card1="Citizens or individuals can generate an ABHA Number to easily access all their reports and other health records which are securely stored on the blockchain and privately shared by an access mechanism.";
const t2="For Health Facilities";
const card2="We have created a unified platform for all health facilities for smooth management of health records, reports and prescriptions.";
const t3="For Healthcare Professionals";
const card3="Arogya Locker empowers healthcare professionals by providing a hassle free patient management and making them a part of blockchain powered digital healthcare ecosystem. ";
export default function Facilities() {
  return (
    <Box sx={{ flexGrow: 1 ,margin:"3%"}}>
      <Grid container spacing={10}>
        <Grid item xs={12} sm={4} md={4}>
          <Cardd info={card1} title={t1} Img={img1} />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Cardd info={card2} title={t2} Img={img2} />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Cardd info={card3} title={t3} Img={img3} />
        </Grid>
      </Grid>
    </Box>
  );
}