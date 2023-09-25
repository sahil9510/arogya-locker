// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@opengsn/contracts/src/ERC2771Recipient.sol";
contract Account is ERC2771Recipient{
    constructor(address forwarder) {
        _setTrustedForwarder(forwarder);
    }

    struct Document{
        uint id;
        string name;
        string cid;
        string fType;
        string date;
        string[] accessTo;
    }

    struct Report{
        uint id;
        string to;
        string from;
        string title;
        string fromName;
        string toName;
        uint fromType;
        string description;
        string date;
        uint[] docs;
    }

    // ID = ABHA ID
    struct Doctor{
        string name;
        string id;
        uint age;
        string regNo;
        string specialisation;
        string hospital;
        string[] patients;
        uint[] records;
        uint[] requests; 
        uint[] responses; 
    }
    struct Patient{
        string name;
        string id;
        uint age;
        string[] doctors;
        uint[] records;
        uint[] responses; 
        uint[] requests; 
    }

    struct Diagnostic{
        string id;
        string name;
        string add;
        uint[] records;
        uint[] responses;
        uint[] requests;
    }

    struct Hospital{
        string id;
        string name;
        string add;
        string[] doctors;
    }

    // string[] public patientList;
    string[] public doctorsList;

    mapping(string => uint) typeOfID;  // To find the type of user
    mapping(string => Patient) public patientInfo;
    mapping(string => Doctor) doctorInfo;
    mapping(string => Hospital) hospitalInfo;
    mapping(string => Diagnostic) diagnosticInfo;

  
    uint public noOfDocs=1;
    uint public noOfReports=1;
    mapping(uint => Document) public docInfo; // Maps Doc ID to the document;
    mapping(uint => Report) public repInfo;

    //Steps of registration:
    // Docs uploaded to IPFS
    // uploadDoc function called with CID
    // Respective Create Function called
    function uploadDoc(string memory _name,string memory _cid,string memory _fType,string memory _uploadDate) public returns (uint){
        Document storage d = docInfo[noOfDocs];
        d.name = _name;
        d.cid = _cid;
        d.fType = _fType;
        d.date = _uploadDate;
        d.id = noOfDocs;
        noOfDocs++;
        return noOfDocs-1;
    }

    function createAgent(string memory _id,string memory _name,uint _age,uint[] memory _docs,uint idType,string memory extra1,string memory extra2) public returns(string memory){
        require(bytes(patientInfo[_id].id).length==0 , "Patient already exists with this id");
        require(bytes(doctorInfo[_id].id).length==0 , "Doctor already exists with this id");
        require(bytes(hospitalInfo[_id].id).length==0 , "Hospital already exists with this id");
        require(bytes(diagnosticInfo[_id].id).length==0 , "Diagnostic already exists with this id");
        if(idType==1){
            Patient storage p = patientInfo[_id];
            p.name=_name;
            p.id = _id;
            p.age = _age;
            p.records = _docs;
            typeOfID[_id]=1;
            for(uint i=0;i<_docs.length;i++){
                docInfo[_docs[i]].accessTo.push(_id);
            }
            // patientList.push(_id);
        }else if(idType==2){
            Doctor storage d = doctorInfo[_id];
            d.name = _name;
            d.id = _id;
            d.age = _age;
            d.records = _docs;
            d.regNo = extra1;
            d.specialisation = extra2;
            typeOfID[_id] =2;
            for(uint i=0;i<_docs.length;i++){
                docInfo[_docs[i]].accessTo.push(_id);
            }
            doctorsList.push(_id);
        }else if(idType==3){
            Hospital storage h = hospitalInfo[_id];
            h.name = _name;
            h.id= _id;
            h.add = extra1;
            typeOfID[_id]=3;
        }else if(idType==4){
            Diagnostic storage d = diagnosticInfo[_id];
            d.name = _name;
            d.id = _id;
            d.add = extra1;
            d.records = _docs; 
            typeOfID[_id]=4;
            for(uint i=0;i<_docs.length;i++){
                docInfo[_docs[i]].accessTo.push(_id);
            }
        }
        return _id;
    }

    function getAllDoctors() public view returns (string[] memory ids,string[] memory names,uint[] memory ages,string[] memory regNos,string[] memory specialisations,string[] memory hospitals){
        string[] memory ids = new string[](doctorsList.length);
        string[] memory names = new string[](doctorsList.length);
        uint[] memory ages = new uint[](doctorsList.length);
        string[] memory regNos = new string[](doctorsList.length);
        string[] memory specialisations = new string[](doctorsList.length);
        string[] memory hospitals = new string[](doctorsList.length);
        for(uint i=0;i<doctorsList.length;i++){
            string memory id = doctorsList[i];
            Doctor storage d = doctorInfo[id];
            ids[i] = d.id;
            names[i] = d.name;
            ages[i] = d.age;
            regNos[i] = d.regNo;
            specialisations[i] = d.specialisation;
            hospitals[i] = d.hospital;            
        }
        return (ids,names,ages,regNos,specialisations,hospitals);
    }

    // Edit further for diagnostics,clinic and hospitals

    function addIntoRecords(string memory _id,uint _docId) public returns (bool){
        if(typeOfID[_id]==1){
            Patient storage p = patientInfo[_id];
            p.records.push(_docId);
            return true;
        }else if(typeOfID[_id]==2){
            Doctor storage d = doctorInfo[_id];
            d.records.push(_docId);
            return true;
        }else if(typeOfID[_id]==4){
            Diagnostic storage d = diagnosticInfo[_id];
            d.records.push(_docId);
            return true;
        }
        return false;
    }

    function getDoctor(string memory _id) public view returns (string memory id,string memory name,uint age,string memory specialisation,string memory regNo,string memory hospital,Document[] memory quals,Patient[] memory patients,Report[] memory responses,Report[] memory requests){
        Doctor storage d = doctorInfo[_id];
        string memory name = d.name;
        string memory id = d.id;
        uint age = d.age;
        string memory specialization = d.specialisation;
        string memory regNo = d.regNo;
        string memory hospital = d.hospital;
        Report[] memory responses = new Report[](d.responses.length);
        Report[] memory requests = new Report[](d.requests.length);
        Document[] memory quals = new Document[](d.records.length);
        Patient[] memory patients = new Patient[](d.patients.length);
        for(uint i=0;i<d.responses.length;i++){
            responses[i] = repInfo[d.responses[i]];
        }
        for(uint i=0;i<d.requests.length;i++){
            requests[i] = repInfo[d.requests[i]];
        }
        for(uint i=0;i<d.records.length;i++){
            quals[i] = docInfo[d.records[i]];
        }
        for(uint i=0;i<d.patients.length;i++){
            patients[i] = patientInfo[d.patients[i]];
        }
        return (id,name,age,specialization,regNo,hospital,quals,patients,responses,requests);
    }

    function getPatient(string memory _id) public view returns (string memory id,string memory name,uint age,Document[] memory records,Doctor[] memory doctors,Report[] memory responses,Report[] memory requests){
        Patient memory p = patientInfo[_id];
        string memory name = p.name;
        string memory id = p.id;
        uint age = p.age;
        Doctor[] memory doctors = new Doctor[](p.doctors.length);
        Report[] memory responses = new Report[](p.responses.length);
        Report[] memory requests = new Report[](p.requests.length);
        Document[] memory records = new Document[](p.records.length);
        for(uint i=0;i<p.responses.length;i++){
            responses[i] = repInfo[p.responses[i]];
        }
        for(uint i=0;i<p.requests.length;i++){
            requests[i] = repInfo[p.requests[i]];
        }
        for(uint i=0;i<p.records.length;i++){
            records[i] = docInfo[p.records[i]];
        }

        for(uint i=0;i<p.doctors.length;i++){
            doctors[i] = doctorInfo[p.doctors[i]];
        }

        return (id,name,age,records,doctors,responses,requests);

    }
    function getHospital(string memory _id) public view returns (string memory id,string memory name,string memory add,Doctor[] memory doctors){
        Hospital memory h = hospitalInfo[_id];
        string memory name = h.name;
        string memory id = h.id;
        string memory add = h.add;
        Doctor[] memory doctors = new Doctor[](h.doctors.length);
        for(uint i=0;i<h.doctors.length;i++){
            doctors[i] = doctorInfo[h.doctors[i]];
        }
        return (id,name,add,doctors);
    }
    function getDiagnostic(string memory _id) public view returns (string memory id,string memory name,string memory add,Document[] memory records,Report[] memory responses,Report[] memory requests) {
        Diagnostic memory d = diagnosticInfo[_id];
        string memory name = d.name;
        string memory id = d.id;  
        string memory add = d.add;
        Report[] memory responses = new Report[](d.responses.length);
        Report[] memory requests = new Report[](d.requests.length);
        Document[] memory records = new Document[](d.records.length);
        for(uint i=0;i<d.responses.length;i++){
            responses[i] = repInfo[d.responses[i]];
        }
        for(uint i=0;i<d.requests.length;i++){
            requests[i] = repInfo[d.requests[i]];
        }
        for(uint i=0;i<d.records.length;i++){
            records[i] = docInfo[d.records[i]];
        }
        return (id,name,add,records,responses,requests);     
    }

    function addAgent(string memory _id1,string memory _id2) public returns (bool){
        require(bytes(doctorInfo[_id2].id).length!=0 , "No doctor with this abha id exists");
        Hospital storage h = hospitalInfo[_id1];
        h.doctors.push(_id2);
        Doctor storage d = doctorInfo[_id2];
        d.hospital = h.name;
        return true;
    }

    function createReport(string memory _from,string memory _to,string memory _title,string memory _description, string memory _date,uint[] memory _docs) public returns (uint){
        Report storage r = repInfo[noOfReports];
        r.id=noOfReports;
        noOfReports++;
        r.from=_from;
        r.to=_to;
        r.title = _title;
        r.description= _description;
        r.date = _date;
        r.fromType = typeOfID[_from];
        for(uint i=0;i< _docs.length;i++){
            r.docs.push(_docs[i]);
            docInfo[_docs[i]].accessTo.push(_to);
        }
        if(typeOfID[_from]==1){
            Patient storage p =  patientInfo[_from];
            r.fromName = p.name;
            p.responses.push(r.id);
            Doctor storage d = doctorInfo[_to];
            require(bytes(d.id).length!=0 , "No doctor with this abha id exists");
            r.toName = d.name;
            d.requests.push(r.id);
        }else if(typeOfID[_from]==2){
            Doctor storage d = doctorInfo[_from];
            r.fromName = d.name;
            d.responses.push(r.id);
            Patient storage p =  patientInfo[_to];
            require(bytes(p.id).length!=0 , "No patient with this abha id exists");
            r.toName = p.name;
            p.requests.push(r.id);
        }else if(typeOfID[_from]==4){
            Diagnostic storage d = diagnosticInfo[_from];
            r.fromName = d.name;
            d.responses.push(r.id);
            Patient storage p = patientInfo[_to];
            require(bytes(p.id).length!=0 , "No patient with this abha id exists");
            r.toName = p.name;
            p.requests.push(r.id);
        }
        return noOfReports-1;
    }

}
