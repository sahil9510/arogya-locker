const express = require('express');
const cors = require('cors');
const patientRoute = require('./routes/patientRoute.js')
const doctorRoute = require('./routes/doctorRoute.js')
const diagnosticRoute = require('./routes/diagnosticRoute.js')
const hospitalRoute = require('./routes/hospitalRoute.js')
const uploadRoute = require('./routes/uploadRoute.js')
const commonRoute = require('./routes/commonRoute.js')
require("dotenv").config()
const HttpError = require("./models/http-error.js")


const cookieParser = require("cookie-parser");

const app = express()
const port = process.env.PORT || 5000
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())


app.use(express.json())
app.use("/api/patient",patientRoute)
app.use("/api/doctor",doctorRoute)
app.use("/api/diagnostic",diagnosticRoute)
app.use("/api/upload",uploadRoute)
app.use("/api/common",commonRoute)
app.use('/api/hospital',hospitalRoute)

//error handler
app.use((req, res, next) => {
    const error = new HttpError("Could not find this route", 404);
    throw error;
  });
  
  app.use((error, req, res, next) => {
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
  });

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})