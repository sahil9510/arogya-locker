const express =require("express");
const { signup, signin , getPatientById} =require("../controller/patient-controller.js");

const router = express.Router();

router.get("/:pid",getPatientById);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports= router;
