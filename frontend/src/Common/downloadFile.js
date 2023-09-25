import React from 'react';
import {create} from 'ipfs-http-client'
import {Buffer} from 'buffer'

async function ipfsClient(){
    const auth = 'Basic ' + Buffer.from("2TZSx72Yq9LW0xkgdCnaadanMrd"+ ':' + "494b1150efc0e1adc035ac4e87bf5f52").toString('base64');
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

    // Private
    // const ipfs = await create({
    //   url: 'http://127.0.0.1:5001'
    // })
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