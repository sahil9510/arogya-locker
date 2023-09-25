const crypto = require('crypto');
require("dotenv").config()
const key = process.env.SECRET_KEY
const iv = process.env.SECRET_IV 
function encrypt(input,abhaId) {
    const aesCipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key+abhaId),Buffer.from(iv));
    return aesCipher.update(input, 'utf8', 'hex') + aesCipher.final('hex');
}
  
function decrypt(input,abhaId){
    const aesDecipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key + abhaId), Buffer.from(iv));
    return aesDecipher.update(input, 'hex', 'utf8') + aesDecipher.final('utf8');
}

module.exports={
    encrypt: encrypt,
    decrypt: decrypt
}