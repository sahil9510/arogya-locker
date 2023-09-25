module.exports.CONTRACT_ADDRESS = "0x1BEb7Dc34C2759adb7cDDE8d6A55A7B9921a6D83"
module.exports.CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "forwarder",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id1",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_id2",
        "type": "string"
      }
    ],
    "name": "addAgent",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_docId",
        "type": "uint256"
      }
    ],
    "name": "addIntoRecords",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "_docs",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "idType",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "extra1",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "extra2",
        "type": "string"
      }
    ],
    "name": "createAgent",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_from",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_to",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_date",
        "type": "string"
      },
      {
        "internalType": "uint256[]",
        "name": "_docs",
        "type": "uint256[]"
      }
    ],
    "name": "createReport",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "docInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "fType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "date",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "doctorsList",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllDoctors",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "ids",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "names",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "ages",
        "type": "uint256[]"
      },
      {
        "internalType": "string[]",
        "name": "regNos",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "specialisations",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "hospitals",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "getDiagnostic",
    "outputs": [
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "add",
        "type": "string"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "cid",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "accessTo",
            "type": "string[]"
          }
        ],
        "internalType": "struct Account.Document[]",
        "name": "records",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "to",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "from",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fromName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "toName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "fromType",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "uint256[]",
            "name": "docs",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct Account.Report[]",
        "name": "responses",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "to",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "from",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fromName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "toName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "fromType",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "uint256[]",
            "name": "docs",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct Account.Report[]",
        "name": "requests",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "getDoctor",
    "outputs": [
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "specialisation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "regNo",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "hospital",
        "type": "string"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "cid",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "accessTo",
            "type": "string[]"
          }
        ],
        "internalType": "struct Account.Document[]",
        "name": "quals",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "id",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "age",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "doctors",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "records",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "responses",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "requests",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct Account.Patient[]",
        "name": "patients",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "to",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "from",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fromName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "toName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "fromType",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "uint256[]",
            "name": "docs",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct Account.Report[]",
        "name": "responses",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "to",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "from",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fromName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "toName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "fromType",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "uint256[]",
            "name": "docs",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct Account.Report[]",
        "name": "requests",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "getHospital",
    "outputs": [
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "add",
        "type": "string"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "id",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "age",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "regNo",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "specialisation",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hospital",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "patients",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "records",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "requests",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "responses",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct Account.Doctor[]",
        "name": "doctors",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "getPatient",
    "outputs": [
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "cid",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "accessTo",
            "type": "string[]"
          }
        ],
        "internalType": "struct Account.Document[]",
        "name": "records",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "id",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "age",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "regNo",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "specialisation",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hospital",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "patients",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "records",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "requests",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "responses",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct Account.Doctor[]",
        "name": "doctors",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "to",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "from",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fromName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "toName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "fromType",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "uint256[]",
            "name": "docs",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct Account.Report[]",
        "name": "responses",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "to",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "from",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fromName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "toName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "fromType",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "uint256[]",
            "name": "docs",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct Account.Report[]",
        "name": "requests",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTrustedForwarder",
    "outputs": [
      {
        "internalType": "address",
        "name": "forwarder",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "forwarder",
        "type": "address"
      }
    ],
    "name": "isTrustedForwarder",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "noOfDocs",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "noOfReports",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "patientInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "repInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "to",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "from",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "fromName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "toName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "fromType",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "date",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_fType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_uploadDate",
        "type": "string"
      }
    ],
    "name": "uploadDoc",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
