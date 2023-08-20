const express =require("express");
const {signin,signup,getHospitalById} = require('../controller/hospital-controller')

const router = express.Router();

router.get("/:hid",getHospitalById);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports= router; 