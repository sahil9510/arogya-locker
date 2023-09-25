import React, { useState, useEffect, useRef } from "react";
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
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Container, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../theme";
import documents from "../../Assets/documents.json";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import downloadFile from "../../Common/downloadFile";
import { toast } from "react-hot-toast";
import { changedata } from "../../store/loginslice";
import LoadingOverlay from "react-loading-overlay";

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

const Documents = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.login.curruser);
  const [accessTo, setAccessTo] = useState("None");
  let patientData = useSelector((state) => state.login.data);
  const [personName, setPersonName] = useState([]);
  const [open, setOpen] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  if (!patientData) {
    patientData = { records: [] };
  }
  const handleClose = () => setOpen(false);
  const doctors = useSelector((state) => state.login.doctors);
  const [docId, setDocId] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [display, setDisplay] = useState(patientData.records);
  const [docName, setDocName] = useState("");
  const inputRef = useRef();

  const uploadHandler = async (e) => {
    setFile(e.target.files[0]);
    // setDocName(inputRef.current.value);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setIsUploading(true);
    // setIsLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL+"/api/upload/file",
        formData
      );
      setDocId(response.data.docId);
      // setIsLoading(false);
      setIsUploading(false);
      // inputRef.current.value = docName;
    } catch (err) {
      console.log(err);
    }
  };
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

      if (response.status == 200) {
        setIsLoading(false);
        toast.success(`Access Granted`);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_API_URL+"/api/common/addIntoRecords",
        {
          id: userid,
          docId: docId,
        }
      );
      const response2 = await axios.post(
        process.env.REACT_APP_API_URL+"/api/patient/signin",
        { abhaid: userid }
      );
      dispatch(changedata(response2.data));
      patientData = response2.data;
      setIsLoading(false);
      toast.success(`File uploaded!`);
      setFile("");
      handleClose();
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    var updatedList = [...patientData.records];
    updatedList = updatedList.filter(
      (item) =>
        item[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item[4].toLowerCase().includes(searchTerm.toLowerCase())
      // item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(updatedList);
  }, [searchTerm, patientData.records]);

  let data = (
    <div>
      <p>No documents found. Try entering something else!</p>
    </div>
  );
  if (filteredList.length !== 0) {
    data = filteredList.map((doc, ind) => (
      <TableRow key={doc[0]}>
        <TableCell>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            {ind + 1}
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
                {doc[1]}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {new Date(doc[4]).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Typography>
        </TableCell>
        <TableCell onClick={() => downloadFile(doc)}>
          <Button variant="contained">Open</Button>
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
                    onClick={() => giveaccess(doc[1], "", doctor.id, doc[0])}
                  />
                </MenuItem>
              ))}
            </Select>
          </Typography>
        </TableCell>
      </TableRow>
    ));
  }
  const BasicModal = () => {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Add a Document
              </Typography>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  padding: "10px",
                }}
              >
                {/* <h5 style={{ paddingTop: "10px" }}>Enter Document Name:</h5>
              <TextField
                required
                id="outlined-required"
                label="Required"
                // value={docName}
                ref={inputRef}
                // onChange={(e) => setDocName(e.target.value)}
              /> */}

                {/* {isLoading?<Loader />: */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {isUploading ? (
                    <h5 style={{ paddingTop: "10px" }}>
                      Verifying your file...
                    </h5>
                  ) : (
                    <>
                      {" "}
                      <h5 style={{ paddingTop: "10px" }}>
                        Upload Your Document:
                      </h5>
                      <input
                        single
                        type="file"
                        name="file"
                        id="file"
                        hidden
                        onChange={(e) => {
                          uploadHandler(e);
                        }}
                      />
                    </>
                  )}

                  <label for="file" style={{ paddingTop: "10px" }}>
                    {file ? file.name : "Select a file"}
                  </label>
                </div>
                {/* } */}
                <br />

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  onClick={submitHandler}
                  disabled={isUploading}
                >
                  {isUploading ? "Please wait" : "Upload"}
                </Button>
              </form>
            </Box>
          )}
        </Modal>
      </div>
    );
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
          backgroundColor: "transparent",
        },
        content: {},
        spinner: {},
      }}
    >
      <div
        style={{
          marginLeft: "220px",
          boxShadow:
            "0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 4px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <ThemeProvider theme={theme}>
          <BasicModal />
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
                  <Typography variant="h4">My Documents</Typography>
                  <TextField
                    id="search"
                    type="search"
                    label="Search"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                    autoComplete="off"
                    sx={{ width: 350 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={handleOpen}
                  >
                    Add Document
                  </Button>
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
                            Document Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            Date
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
    </LoadingOverlay>
  );
};

export default Documents;
