import React, { useState, Fragment, ReactDOM, useEffect, useRef } from "react";
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
import { useSelector } from "react-redux";
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
import TextareaAutosize from "@mui/base/TextareaAutosize";
import theme from "../theme";
import { PDFViewer, pdf, PDFDownloadLink } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import downloadFile from "../../Common/downloadFile";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../Loader";
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 68 * 4.5 + 8,
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
const patient = [
  {
    id: "b23hbehj",
    date: "13/12/23",
    name: "Ajay",
    disease: "aids",
    prescrip: "take medicines 2 times everyday",
    open: "Elite Admin",
  },
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

const Mypatients = () => {
  const userid = useSelector((state) => state.login.curruser);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [docId, setDocId] = useState("");
  const [personName, setPersonName] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const nameRef = useRef();
  const idRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [toId, setToId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [document, setDocument] = useState("");
  let allData = useSelector((state) => state.login.data);
  
  if(!allData){
    allData = {requests: []}
  }
  const [filteredList, setFilteredList] = useState(allData.requests);

  const openModal = () => {
    setFile("");
    setToId("");
    setTitle("");
    setDescription("");
    setName("");
    handleOpen();
  };

  const getDocument = async (docs) => {
    const docId = docs[0];
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL+"/api/common/getDocument",
        { docId: docId }
      );
      if (response.status == 200) {
        setDocument(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const uploadHandler = async (e) => {
    setToId(idRef.current.value);
    setTitle(titleRef.current.value);
    setDescription(descriptionRef.current.value);
    setName(nameRef.current.value);
    setFile(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setIsUploading(true);
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

  const Info = () => {
    return (
      <div>
        <Modal
          open={open1}
          onClose={() => {
            setDocument("");
            setOpen1(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {document ? (
              <>
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
                <Typography variant="body2">
                  {new Date(document.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
                <br />
                <br />
                <Button
                  variant="outlined"
                  onClick={() => downloadFile(document)}
                >
                  Download Report
                </Button>
              </>
            ) : (
              <Typography variant="h5" component="div" textAlign={"center"}>
                {" "}
                Fetching Document{" "}
              </Typography>
            )}
          </Box>
        </Modal>
      </div>
    );
  };

  useEffect(() => {
    var updatedList = [...allData.requests];
    updatedList = updatedList.filter(
      (item) =>
        item[3].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item[4].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item[7].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(updatedList);
  }, [searchTerm, allData.requests]);

  let data = (
    <div>
      <p>No requests found.</p>
    </div>
  );
  if (filteredList.length !== 0) {
    data = filteredList.map((doc) => (
      <TableRow key={doc.id}>
        <TableCell>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            {doc[4]}
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
          <Typography color="textSecondary" variant="h6">
            {new Date(doc[8]).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h6">
            <Button
              variant="contained"
              onClick={() => {
                getDocument(doc[9]);
                setOpen1(true);
              }}
            >
              Open
            </Button>
            <Info />
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
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 500,
                height: file ? 500 : 650,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Add Prescription
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
                <h5 style={{ paddingTop: "10px" }}>
                  {!file && "Enter"} Patient ABHA ID:
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
                  {!file && "Enter"} Patient Name:
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
                {/* 
              <h5 style={{ paddingTop: "10px" }}>Enter Age:</h5>
              <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue=""
              /> */}
                <h5 style={{ paddingTop: "10px" }}>
                  {!file && "Enter"} Disease:
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
                {/* <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h5 style={{paddingTop:"10px"}}>Upload Your Document:</h5>
                <Button variant="outlined" size="small" component="label">
                  Upload File
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </div> */}
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
                <h5 style={{ paddingTop: "10px" }}></h5>
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

  return (
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
                <Typography variant="h4">Requests</Typography>
                <TextField
                  id="search"
                  type="search"
                  label="Search"
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
                {/* <Button variant="outlined" color="success" onClick={openModal}>
                  Add Prescription
                </Button> */}
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
                          Patient Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Report Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Date
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Open Report
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

export default Mypatients;
