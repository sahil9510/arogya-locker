const express =require("express");
const {signin,signup,getDiagnosticById} = require('../controller/diagnostic-controller')

const router = express.Router();

router.get("/:did",getDiagnosticById);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports= router; 