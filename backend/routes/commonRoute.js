const express= require('express');
const {createReport,addIntoRecords,removeAccess,addAgent,removeAgent,getDocument} = require('../controller/common-controller')

const router = express.Router();

router.post("/createReport",createReport);
router.post("/addIntoRecords",addIntoRecords);
router.post("/removeAccess",removeAccess);
router.post("/addAgent",addAgent);
router.post("/removeAgent",removeAgent);
router.post("/getDocument",getDocument);

module.exports = router;

