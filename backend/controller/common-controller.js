const HttpError =require("../models/http-error.js");
const { validationResult } = require("express-validator");
var Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const {CONTRACT_ABI,CONTRACT_ADDRESS} = require('../config.js')
require("dotenv").config()
const {encrypt,decrypt} = require('../models/cipher.js')
const { RelayProvider } = require('@opengsn/provider')
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
const getDocument = async(req,res,next)=>{
    const {docId} = req.body
    let document;
    const provider = await getProvider();
    var web3 = new Web3(provider);
    var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    try{
        document = await contract.methods.docInfo(docId).call();
    }catch(err){
        provider.engine.stop();
        console.log(err);
        const error = new HttpError(
            'Document fetching failed, please try again later!',
            500
        )
        return next(error);
    }
    provider.engine.stop();
    res.json(document);    
}

const createReport = async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const element = errors.errors[0].param;
      const error = new HttpError("Invalid " + element + "!", 422);
      throw next(error);
    }

    const {from,to,title,description,docs,alreadyEncrypted} = req.body
    let fromAbhaId = encrypt(from,from)
    let toAbhaID = to; 
    console.log(fromAbhaId)
    if(!alreadyEncrypted){ 
      console.log("encrypting") 
      toAbhaID = encrypt(to,to)
    }
    console.log(toAbhaID)
    const date = (new Date()).toString();
    let repId;
    const provider1 = await getProvider();
    const provider2 = new Web3(provider1);
    const provider = await RelayProvider.newProvider({provider: provider2.currentProvider,config:{
      paymasterAddress:process.env.PAYMASTER_ADDRESS,
      loggerConfiguration: {
        logLevel: 'debug'
      }
    }}).init()  
    const fromAdd = provider.newAccount().address
    var web3 = new Web3(provider);
    var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    try{
        var receipt = await contract.methods.createReport(fromAbhaId,toAbhaID,title,description,date,docs).send({from:fromAdd});

        repId = await contract.methods.noOfReports().call();
    }catch(err){
        console.log(err);
        provider1.engine.stop();
        const error = new HttpError(
            "Report creation failed, please try again later!",
            500
          );
          return next(error);
    }
    provider1.engine.stop();
    res.json({id:repId});
}

const addIntoRecords = async(req,res,next)=>{
    const {id,docId} = req.body
    let abhaId = encrypt(id,id)
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
        var receipt = await contract.methods.addIntoRecords(abhaId,docId).send({from});
    }catch(err){
        provider1.engine.stop();
        const error = new HttpError(
            "Document upload failed, please try again later!",
            500
          );
          return next(error);
    }
    provider1.engine.stop();
    res.json({message: "Document upload successfully"})
}

const removeAccess= async(req,res,next)=>{
    const {docId,id} = req.body
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
        var receipt = await contract.methods.removeAccess(docId,id).send({from: process.env.ACCOUNT_ADDRESS });
    }catch(err){
        provider1.engine.stop();
        const error = new HttpError(
            "Access change failed, please try again later!",
            500
          );
          return next(error);
    }
    provider1.engine.stop();
    res.json({message: "Access Removed successfully"})
}

const addAgent=async(req,res,next)=>{
    const {id1,id2} = req.body;
    let abhaId1 = encrypt(id1,id1)
    let abhaId2 = encrypt(id2,id2);
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
    let hospital;
    try {
        hospital = await contract.methods.getHospital(abhaId1).call();
        // patient = await Patient.findOne({ abhaid: patientId });
      } catch (err) {
        provider1.engine.stop();
        const error = new HttpError(
          "Something went wrong, could not find hospital!",
          500
        );
        return next(error);
      }
      hospital.doctors.forEach(doctor => {
        if(doctor.id==abhaId2){
            provider1.engine.stop();
            const error = new HttpError(
              "Doctor already added in this hospital",
              500
            );
            return next(error);
        }
      })
    try{
        var receipt = await contract.methods.addAgent(abhaId1,abhaId2).send({from});
    }catch(err){
        provider1.engine.stop();
        const error = new HttpError(
            "Agent addition failed, please try again later!",
            500
          );
          return next(error);
    }
    provider1.engine.stop();
    res.json({message: "Agent added successfully"})
}

const removeAgent=async(req,res,next)=>{
    const {id1,id2} = req.body;
    const provider = await getProvider();
    var web3 = new Web3(provider);
    var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    try{
        var receipt = await contract.methods.removeAgent(id1,id2).send({from: process.env.ACCOUNT_ADDRESS });
    }catch(err){
        provider.engine.stop();
        const error = new HttpError(
            "Agent removal failed, please try again later!",
            500
          );
          return next(error);
    }
    provider.engine.stop();
    res.json({message: "Agent removed successfully"})
}

module.exports={
    createReport,
    addIntoRecords,
    removeAccess,
    addAgent,
    removeAgent,
    getDocument
}