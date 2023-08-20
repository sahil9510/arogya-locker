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
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import { ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../theme";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Loader from "../Loader";
import downloadFile from "../../Common/downloadFile";
import { toast } from "react-hot-toast";
import { changedata } from "../../store/loginslice";

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

const Doctors = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.login.curruser);
  let allData = useSelector((state) => state.login.data);

  if(!allData){
    allData = {doctors: []}
  }
  const [open, setOpen] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleOpen = () => {
    setAbhaId("");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const idRef = useRef();
  const [abhaId, setAbhaId] = useState("");



  const uploadHandler = async () => {
    setAbhaId(idRef.current.value);
    setIsLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL+"/api/common/addAgent",
        {
          id1: userid,
          id2: idRef.current.value,
        }
      );

      const response2=await axios.post(process.env.REACT_APP_API_URL+"/api/hospital/signin",{abhaid:userid})
      dispatch(changedata(response2.data));
      allData = response2.data;
      setIsLoading(false);
      toast.success(`Doctor added!`);
      handleClose();

    } catch (err) {
      setIsLoading(false);
      toast.error(err.response.data.message);
    }
  };    

  useEffect(() => {

    var updatedList = [...allData.doctors];
    updatedList = updatedList.filter(
      (item) =>
        item[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item[4].toLowerCase().includes(searchTerm.toLowerCase())
      // item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(updatedList);
  }, [searchTerm, allData.doctors]);

  let data = (
    <div>
      <p>No doctors found.</p>
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
                {doc[0]}
              </Typography>
              
            </Box>
          </Box>
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
                {doc[2]}
              </Typography>
              
            </Box>
          </Box>
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
                {doc[4]}
              </Typography>
              
            </Box>
          </Box>
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
                height: 300,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Add a Doctor
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
                   Doctor ABHA ID:
                </h5>
                {abhaId ? (
                  abhaId
                ) : (
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    inputRef={idRef}
                  />
                )}
                
                <Button
                sx={{marginTop:"5%"}}
                  variant="contained"
                  color="success"
                  disabled={isLoading}
                  onClick={uploadHandler}
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
                <Typography variant="h4">Our Doctors</Typography>
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
                <Button variant="outlined" color="success" onClick={handleOpen}>
                  Add a Doctor
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
                          Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Age
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Reg. No.
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Specialisation
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

export default Doctors;
