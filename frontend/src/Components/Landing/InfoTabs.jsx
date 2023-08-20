import * as React from "react";
import { styled } from "@mui/system";
import Tabs from "@mui/base/Tabs";
import TabsList from "@mui/base/TabsList";
import TabPanel from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import Tab, { tabClasses } from "@mui/base/Tab";
import Content from "./Content";
import image1 from "../../Assets/abhanum.jpeg";
import image2 from "../../Assets/image-3.5.png";
import image3 from "../../Assets/2017-predict-1.jpg";
import image4 from "../../Assets/BlogGraphic-Blockchains-01-1.png"
import theme from "../theme";
import { ThemeProvider } from "@mui/material";

const ABHANumber =
  "Ayushman Bharat Health Account (ABHA) Number is a hassle-free method of accessing and sharing your health records digitally. It enables your interaction with participating healthcare providers, and allows you to receive your digital lab reports, prescriptions and diagnosis seamlessly from verified healthcare professionals and health service providers.";
const ehr =
  "An electronic health record (EHR) is an individual's official health document that is shared among multiple facilities and agencies. EHRs are widely used because they are efficient, secure and reduce data redundancy. They have become important because of increasing digitization and to provide ease of accessibility.";

const interfaces =
"Arogya Locker provides design intuitive user interfaces catering to distinct stakeholders in the healthcare ecosystem, including clinics, hospitals, doctors, diagnostics centers, and patients. These interfaces provide a unified platform for streamlined EHR access and management.";
const blockchain =
  "A distributed ledger protocol composed of encrypted blocks of data organized in chains, blockchain solves the shortcomings of EHRs in terms of interoperability and privacy. Arogya Locker integrates block chain infrastructure with Health Stack to ensure secure identity management and efficient medical records management. ";
export default function InfoTabs() {
  return (
    <div style={{ margin: "2%",display:"flex", justifyContent:"center"}}>
      <ThemeProvider theme={theme}>
        <Tabs defaultValue={0}>
          <StyledTabsList>
            <StyledTab value={0}>ABHA Number</StyledTab>
            <StyledTab value={1}>Electronic Health Record</StyledTab>
            <StyledTab value={2}>Multiple Interfaces</StyledTab>
            <StyledTab value={3}>Blockchain</StyledTab>
          </StyledTabsList>
          <StyledTabPanel value={0} sx={{opacity:"1", width:"100%",backgroundColor:"rgb(232, 245, 253)"}}>
            <Content info={ABHANumber} source={image1} />
          </StyledTabPanel>
          <StyledTabPanel value={1} sx={{opacity:"1", width:"100%",backgroundColor:"rgb(232, 245, 253)"}}>
            <Content info={ehr} source={image2} />
          </StyledTabPanel>
          <StyledTabPanel value={2} sx={{opacity:"1", width:"100%",backgroundColor:"rgb(232, 245, 253)"}}>
            <Content info={interfaces} source={image3} />
          </StyledTabPanel>
          <StyledTabPanel value={3} sx={{opacity:"1", width:"100%",backgroundColor:"rgb(232, 245, 253)"}}>
            <Content info={blockchain} source={image4} />
          </StyledTabPanel>
        </Tabs>
      </ThemeProvider>
    </div>
  );
}

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledTab = styled(Tab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTabPanel = styled(TabPanel)(
  ({ theme }) => `
  width: 98%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  border-radius: 12px;
  opacity: 0.6;
  `
);

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
);
