const HttpError = require("../models/http-error.js");
const { validationResult } = require("express-validator");
const { RelayProvider } = require('@opengsn/provider')
var Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const {CONTRACT_ABI,CONTRACT_ABI2,CONTRACT_ADDRESS} = require('../config.js')
require("dotenv").config()
const {encrypt,decrypt} = require('../models/cipher.js')


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
const getPatientById = async (req, res, next) => {
  const patientId = req.params.pid;
  let patient;
  const provider = await getProvider();
  var web3 = new Web3(provider);
  var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  let abhaId = encrypt(patientId,patientId)
  try {
    patient = await contract.methods.getPatient(abhaId).call(); 
  } catch (err) {
    provider.engine.stop();
    const error = new HttpError(
      "Something went wrong, could not find patient!",
      500
    );
    return next(error);
  }

  if (!patient || !patient.id) {
    provider.engine.stop();
    const error = new HttpError(
      "Could not find a patient for the provided ABHA id.",
      404
    );
    return next(error);
  }
  const user = {
    ...user,
    '0' : decrypt(patient.id,patientId),
    id: decrypt(patient.id,patientId),
  }
  provider.engine.stop();
  res.json({patient:user})
};


const signup = async (req, res, next) => {
  const { abhaid, name, age, phoneno } = req.body;

  let existingUser;
  const provider1 = await getProvider();
  const provider2 = new Web3(provider1);
  const provider = await RelayProvider.newProvider({provider: provider2.currentProvider,config:{
    paymasterAddress: process.env.PAYMASTER_ADDRESS,
    loggerConfiguration: {
      logLevel: 'debug'
    }
  }}).init()  
  const from = provider.newAccount().address
  var web3 = new Web3(provider);
  var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  let abhaId = encrypt(abhaid,abhaid)
  console.log(abhaId)
  try {
    existingUser = await contract.methods.getPatient(abhaId).call();
  } catch (err) {
    console.log(err)
    provider1.engine.stop();
    const error = new HttpError(
      "Signing up failed, please try again later!",
      500
    );
    return next(error);
  }

  if (existingUser && existingUser.id) {
    provider1.engine.stop();
    const error = new HttpError("User already exists, please login instead!");
    return next(error);
  } 
  try {
    var receipt = await contract.methods.createAgent(abhaId,name,age,[],1,"","").send({from});
  } catch (err) {
    provider1.engine.stop();
    console.log(err)
    const error = new HttpError(
      "Signing up failed, please try again later!",
      500
    );
    return next(error);
  }

  provider1.engine.stop();
  res.status(201).json({ id: abhaid });
};  

//this api is for signing in by the user
const signin = async (req, res, next) => {
  let existingUser;
  const provider = await getProvider();
  var web3 = new Web3(provider);
  var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  let abhaId = encrypt(req.body.abhaid,req.body.abhaid)
  console.log(abhaId)
  try {
    existingUser = await contract.methods.getPatient(abhaId).call();
  } catch (err) {
    provider.engine.stop();
    const error = new HttpError(
      "Logging in failed, please try again later!",
      500
    );
    return next(error);
  }
  if (!existingUser || !existingUser.id) {
    console.log(existingUser)
    provider.engine.stop();
    const error = new HttpError(
      "Invalid credentials, could not log you in!",
      401
    );
    return next(error);
  }

  const user = {
    ...existingUser,
    '0': decrypt(existingUser.id,req.body.abhaid),
    id: decrypt(existingUser.id,req.body.abhaid),
  }
  provider.engine.stop();
  res.json(user);
};

module.exports={
  signin: signin,
  signup: signup,
  getPatientById: getPatientById
}
