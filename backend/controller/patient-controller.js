const HttpError = require("../models/http-error.js");
const { validationResult } = require("express-validator");
var Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const {CONTRACT_ABI,CONTRACT_ADDRESS} = require('../config.js')
require("dotenv").config()


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
  try {
    patient = await contract.methods.getPatient(patientId).call(); 
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
  provider.engine.stop();
  res.json({patient:patient})
};


const signup = async (req, res, next) => {
  const { abhaid, name, age, phoneno } = req.body;

  let existingUser;
  const provider = await getProvider();
  var web3 = new Web3(provider);
  var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  try {
    existingUser = await contract.methods.getPatient(abhaid).call();
  } catch (err) {
    console.log(err)
    provider.engine.stop();
    const error = new HttpError(
      "Signing up failed, please try again later!",
      500
    );
    return next(error);
  }

  if (existingUser && existingUser.id) {
    provider.engine.stop();
    const error = new HttpError("User already exists, please login instead!");
    return next(error);
  }

  try {
    var receipt = await contract.methods.createAgent(abhaid,name,age,[],1,"","").send({from: process.env.ACCOUNT_ADDRESS });
  } catch (err) {
    provider.engine.stop();
    const error = new HttpError(
      "Signing up failed, please try again later!",
      500
    );
    return next(error);
  }

  provider.engine.stop();
  res.status(201).json({ id: abhaid });
};  

//this api is for signing in by the user
const signin = async (req, res, next) => {
  let existingUser;
  const provider = await getProvider();
  var web3 = new Web3(provider);
  var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  try {

    existingUser = await contract.methods.getPatient(req.body.abhaid).call();
  } catch (err) {
    provider.engine.stop();
    const error = new HttpError(
      "Logging in failed, please try again later!",
      500
    );
    return next(error);
  }
  if (!existingUser || !existingUser.id) {
    provider.engine.stop();
    const error = new HttpError(
      "Invalid credentials, could not log you in!",
      401
    );
    return next(error);
  }


  provider.engine.stop();
  res.json(existingUser);
};

module.exports={
  signin: signin,
  signup: signup,
  getPatientById: getPatientById
}
