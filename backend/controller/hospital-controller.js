var Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");
const { CONTRACT_ABI, CONTRACT_ADDRESS } = require("../config.js");
require("dotenv").config();
const HttpError =require("../models/http-error.js");
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

const signup = async (req, res, next) => {
  const { abhaid, name, address } = req.body;

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
  try {
    existingUser = await contract.methods.getHospital(abhaId).call();
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
  let encAdd = encrypt(address,abhaid)
  try {
    var receipt = await contract.methods
      .createAgent(abhaId, name, 0, [], 3, encAdd, "")
      .send({ from});

  } catch (err) {
    console.log(err)
    provider.engine.stop();
    const error = new HttpError(
      "Signing up failed, please try again later!",
      500
    );
 
    return next(error);
  }
  provider1.engine.stop();
  res.status(201).json({ id: abhaid });
};

const signin = async (req, res, next) => {
  let existingUser;
  const provider = await getProvider();
  var web3 = new Web3(provider);
  var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  let abhaId = encrypt(req.body.abhaid,req.body.abhaid)
  try {
    existingUser = await contract.methods.getHospital(abhaId).call();
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
    "0" : decrypt(existingUser.id,req.body.abhaid),
    "2" : decrypt(existingUser.add,req.body.abhaid),
    id: decrypt(existingUser.id,req.body.abhaid),
    add: decrypt(existingUser.add,req.body.abhaid),
  }
  provider.engine.stop();
  res.json(user);
};

const getHospitalById = async (req, res, next) => {
  const hospitalId = req.params.hid;
  let hospital;
  const provider = await getProvider();
  var web3 = new Web3(provider);
  var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  let abhaId = encrypt(hospitalId,hospitalId)
  try {
    hospital = await contract.methods.getHospital(abhaId).call();
  } catch (err) {
    provider.engine.stop();
    const error = new HttpError(
      "Something went wrong, could not find patient!",
      500
    );
    return next(error);
  }

  if (!hospital || !hospital.id) {
    provider.engine.stop();
    const error = new HttpError(
      "Could not find a patient for the provided ABHA id.",
      404
    );
    return next(error);
  }
  provider.engine.stop();
  const user = {
    ...hospital,
    "0" : decrypt(hospital.id,hospitalId),
    "2" : decrypt(hospital.add,hospitalId),
    id: decrypt(hospital.id,hospitalId),
    add: decrypt(hospital.add,hospitalId),
  }
  res.json({ hospital: user});
  
};

module.exports = {
  signin: signin,
  signup: signup,
  getHospitalById: getHospitalById,
};
