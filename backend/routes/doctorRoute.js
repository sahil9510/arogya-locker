const express = require("express");
const { signup, signin ,getAllDoctors,getDoctorById} =require("../controller/doctor-controller.js");

const router = express.Router();

router.get("/", getAllDoctors);
router.get("/:did", getDoctorById);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports=router;
