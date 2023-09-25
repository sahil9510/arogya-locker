const express = require("express");
const fileUpload =require("../middleware/file-upload.js");
const HttpError = require("../models/http-error.js");
const {CONTRACT_ABI,CONTRACT_ADDRESS} = require('../config.js')
const {create} =require('ipfs-http-client')
var Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const fs = require("fs");
const router = express.Router();
const { RelayProvider } = require('@opengsn/provider')
require("dotenv").config()

var INFURA_ID = process.env.INFURA_ID
var INFURA_SECRET_KEY = process.env.INFURA_SECRET_KEY
const auth = 'Basic ' + Buffer.from(INFURA_ID+ ':' + INFURA_SECRET_KEY).toString('base64');
 
async function ipfsClient(){
  // Private
  const ipfs = await create(
    {
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth
    }
  }
  )
  // Public
  // const ipfs = await create({
  //   url: 'http://127.0.0.1:5001'
  // })
  return ipfs;
}
const getProvider = async () => {
  const origInit = Provider.prototype.initialize;
  Provider.prototype.initialize = async function () {
    while (true) {
      try {
        return await origInit.call(this);
      } catch (e) {
        console.log("origInit failed");
        console.log(e);
      }
    }
  };
  var provider = new Provider({
    privateKeys: [process.env.ACCOUNT_PRIVATE_KEY],
    providerOrUrl: process.env.RPC_URL,
    addressIndex: 0,  
  });
  provider.engine._blockTracker.on('error', function (e) {
        console.log('BlockTracker error', e);
        console.log(e);
    });
    provider.engine.on('error', function (e) {
        console.log('Web3ProviderEngine error');
        console.log(e);
    });
  return provider;
};

router.post("/file", fileUpload.single("file"), async(req, res) => {
  if(!req.file){
    throw new HttpError("No file detected",300);
  }
  const filename = req.file.filename;
  const destination = req.file.destination;  
  const fileType = req.file.mimetype; 
  const fileDate = (new Date()).toString();
  const path = req.file.path;
  let ipfs = await ipfsClient(); 

  let data = fs.readFileSync(path);
  let options = {
    warpWithDirectory: false,
    progress: (prog) => console.log(`Saved: ${prog}`)
  } 
  let result = await ipfs.add(data,options);
  const cid = await result.path;
  const provider1 = await getProvider();
  const provider2 = new Web3(provider1);
  const provider = await RelayProvider.newProvider({provider: provider2.currentProvider,config:{
    paymasterAddress:process.env.PAYMASTER_ADDRESS,
    loggerConfiguration: {
      logLevel: 'debug'
    }
  }}).init()  
  const from = provider.newAccount().address
  var web3 = new Web3(provider);
  var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  try{
    var receipt = await contract.methods.uploadDoc(filename,cid,fileType,fileDate).send({from});
  }catch(err){
    console.log(err)
    provider1.engine.stop();
  }
  try{

    var id = await contract.methods.noOfDocs().call()
  }catch(err){
    console.log(err)
    provider1.engine.stop();
  }
  provider1.engine.stop();
  fs.unlink(path, (err) => {
    if (err) throw err //handle your error the way you want to;
      });
  res.json({ docId: id-1 });
});

module.exports= router;
