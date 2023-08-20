import React from 'react';
import {create} from 'ipfs-http-client'
import {Buffer} from 'buffer'

async function ipfsClient(){
    const auth = 'Basic ' + Buffer.from(process.env.REACT_APP_INFURA_ID + ':' + process.env.REACT_APP_INFURA_SECRET_KEY).toString('base64');

    const ipfs = await create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth
      }
    })
    return ipfs;
}
const downloadFile = async(doc)=>{
    try{
      let ipfs = await ipfsClient();
      let cid = doc[2];
      const resp = await ipfs.cat(cid);
      let content = [];
      for await (const chunk of resp) {
        content = [...content, ...chunk];
      }
      const buffer = Buffer.from(content)
      const blob = new Blob([buffer]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = doc[1];
      a.target = '_self';
      a.click();
      window.URL.revokeObjectURL(url);
    }catch(err){
      console.log(err)
    }
}

  export default downloadFile;