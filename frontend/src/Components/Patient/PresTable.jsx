import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import documents from "../../Assets/documents.json";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import axios from "axios";
import downloadFile from "../../Common/downloadFile";
import { toast } from "react-hot-toast";
import Loader from "../Loader";

const theme = createTheme({
  typography: {
    fontFamily: "'Lato', sans-serif",
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PresTable = () => {
  const [personName, setPersonName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [filteredList, setFilteredList] = useState(documents);
  const doctors = useSelector((state) => state.login.doctors);
  let patientData = useSelector((state) => state.login.data);
  const [document,setDocument] = useState("");
  const [open, setOpen] = useState(false);
  const userid = useSelector((state) => state.login.curruser);
  if(!patientData){
    patientData = {requests: []}
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const getDocument = async(docs) =>{
    const docId = docs[0]
    try{
    const response = await axios.post(
      process.env.REACT_APP_API_URL+"/api/common/getDocument",
      {docId: docId}
    );
    if(response.status==200){
      setDocument(response.data)
    }
    }catch(err){
      console.log(err)
    }

  }
  const giveaccess = async (titl, desc, doctid, documentid) => {
    try {
      const repdata = {
        from: userid,
        to: doctid,
        title: titl,
        description: desc,
        docs: [documentid],
        alreadyEncrypted: true
      };
      setIsLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_API_URL+"/api/common/createReport",
        repdata
      );

      if (response.status==200) {
        setIsLoading(false);
        toast.success(`Access Granted`);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const Info = () => {
    return (
      <div>
        <Modal
          open={open}
          onClose={()=>{
            setDocument('')
            handleClose()
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          {document? <>
            <Typography variant="h6" component="div">
              File Name:
            </Typography>
            <Typography variant="h5" component="div">
              {document.name}
            </Typography>
            <br />

            <Typography variant="h6" component="div">
              Date:
            </Typography>
            <Typography variant="body2">{new Date(document.date).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}</Typography>
            <br />
            <br />
            <Button variant="outlined" onClick={()=>downloadFile(document)}>
              Download Report
            </Button>
            </> :
            <Typography variant="h5" component="div" textAlign={"center"}> Fetching Document </Typography>}
          </Box>
        </Modal>
      </div>
    );
  };

  useEffect(() => {
    var updatedList = [...patientData.requests];
    updatedList = updatedList.filter(
      (item) =>
        item[3].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item[4].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item[6].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item[7].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(updatedList);
  }, [searchTerm, patientData.requests]);

  let data = (
    <div>
      <p>No prescriptions found. Try entering something else!</p>
    </div>
  );

  if (filteredList.length !== 0) {
    data = filteredList.map((doc,ind) =>
      doc[6] === "2" ? (
        <>
          <TableRow key={doc[0]}>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {ind+1}
              </Typography>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {doc[3]}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {doc[7]}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {doc[4  ]}
              </Typography>
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                onClick={() => {
                  getDocument(doc[9]);
                  handleOpen();
                }}
              >
                Open
              </Button>
              <Info docs={doc[9]} />
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={"None"}
                  fullWidth
                >
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  {doctors && doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.name}>
                    <ListItemText
                    primary={doctor.name}
                    onClick={() => giveaccess(doc[3], doc[7], doctor.id, doc[9][0])}
                  />
                    </MenuItem>
                  ))}
                </Select>
              </Typography>
            </TableCell>
          </TableRow>
        </>
      ) : (
        <></>
      )
    );
  }
  if(isLoading){
    return <Loader/>
  }
  return (
    <div style={{ marginLeft: "220px" }}>
      <ThemeProvider theme={theme}>
        <Box>
          <Card variant="outlined">
            <CardContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4">My Prescriptions</Typography>
                <TextField
                  id="search"
                  type="search"
                  label="Search"
                  autoComplete="off"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  sx={{ width: 350 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <Box>
                <Table
                  aria-label="simple table"
                  sx={{
                    mt: 3,
                    whiteSpace: "nowrap",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Sr No
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Disease
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Description
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Doctor Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Open
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography color="textSecondary" variant="h6">
                          Access
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{data}</TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default PresTable;
