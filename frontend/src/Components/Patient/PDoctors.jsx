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
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Container, InputAdornment } from "@mui/material";
// import { changedoctors } from "/Users/saketmundra/Desktop/Projects/health-frontend/src/store/loginslice.jsx";
import { changedoctors } from "../../store/loginslice";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../theme";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoadingOverlay from "react-loading-overlay";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

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

const PDoctors = () => {
  const [personName, setPersonName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [filteredList, setFilteredList] = useState(loadedUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () =>{setToId(""); setOpen(false);}

  const dispatch = useDispatch();
  const userid = useSelector((state) => state.login.curruser);
  const doctors = useSelector((state) => state.login.doctors);
  const nameRef = useRef();
  const idRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [toId, setToId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState("");
  const [docId, setDocId] = useState("");
  const [directContact,setDirectContact] = useState(false)

  const uploadHandler = async (e) => {
    if(!toId){
      setToId(idRef.current.value);
      setName(nameRef.current.value);
      setDirectContact(false);
    }else{
      setDirectContact(true);
    }
    setTitle(titleRef.current.value);
    setDescription(descriptionRef.current.value);
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
      nameRef.current.value = name;
    } catch (err) {
      console.log(err);
    }
  };
  const createReport = async () => {
    const repdata = {
      from: userid,
      to: toId,
      title: title,
      description: description,
      docs: [docId],
      alreadyEncrypted: directContact
    };
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_API_URL+"/api/common/createReport",
        repdata
      );

      if (response.ok) {
        setIsLoading(false);
        toast.success(`Report created`);
      } 
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL+"/api/doctor/");
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        setLoadedUsers(responseData.doctors);
        dispatch(changedoctors(responseData.doctors));
        setIsLoading(false);
      } catch (err) {}
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    var updatedList = [...loadedUsers];
    updatedList = updatedList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.abhaid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.specialisation.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(updatedList);
  }, [searchTerm, loadedUsers]);

  let data = (
    <div>
      <p>No doctors found.</p>
    </div>
  );

  if (filteredList.length !== 0) {
    data = filteredList.map((doc) => (
      <TableRow key={doc.abhaid}>
        {/* <TableCell>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            {doc.id}
          </Typography>
        </TableCell> */}
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
                {doc.name}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {doc.specialisation}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {doc.hospital || "-"}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {doc.regNo}
          </Typography>
        </TableCell>
        <TableCell>
        <Button variant="outlined" color="success" onClick={()=>{
          setToId(doc.id);
          handleOpen()}}>
                  <MailOutlineIcon />
                </Button>
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
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 500,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Contact a Doctor
              </Typography>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  padding: "10px",
                }}
                onSubmit={(e) => e.preventDefault()}
              >
                {!toId && <><h5 style={{ paddingTop: "10px" }}>
                  {!file && "Enter"} Doctor ABHA ID:
                </h5>
                {toId ? (
                  toId
                ) : (
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    inputRef={idRef}
                  />
                )} 
                <h5 style={{ paddingTop: "10px" }}>
                  {!file && "Enter"} Doctor Name:
                </h5>
                {name ? (
                  name
                ) : (
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    type="text"
                    inputRef={nameRef}
                  />
                )}
                </> }
                <h5 style={{ paddingTop: "10px" }}>
                  {!file && "Enter"} Issue:
                </h5>
                {title ? (
                  title
                ) : (
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    inputRef={titleRef}
                  />
                )}
                <h5 style={{ paddingTop: "10px" }}>
                  {!file && "Enter"} Description:
                </h5>
                {description ? (
                  description
                ) : (
                  <TextareaAutosize
                    required
                    label="Required"
                    defaultValue=""
                    minRows={3}
                    maxRows={3}
                    ref={descriptionRef}
                  />
                )}
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
                {/* <h5 style={{ paddingTop: "10px" }}></h5> */}
                <Button
                  variant="contained"
                  color="success"
                  disabled={isUploading}
                  onClick={createReport}
                >
                  Submit
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
    <div style={{ marginLeft: "220px" }}>
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
                <Typography variant="h4">Doctors</Typography>
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
                <Button variant="outlined" color="success" onClick={handleOpen}>
                  Contact A Doctor
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
                      {/* <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          ABHA ID
                        </Typography>
                      </TableCell> */}
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Doctor Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Specialisation
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Hospital
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Regis No
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Contact
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
    </div></LoadingOverlay>
  );
};
export default PDoctors;
