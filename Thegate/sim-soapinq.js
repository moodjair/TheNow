"use strict";

var soap = require('soap');
var express = require('express');
var fs = require('fs');
var request = require('superagent');


// the splitter function, used by the service
function splitter_function(args) {
    console.log('splitter_function');
    var dataReq =
           {
            IWSID: "THEGATE",
            IWSREF: "1234556",
            IACCTNO: args.account
        }
    request
    .post("http://172.18.3.104:10010/web/services/inqA")
    .send(dataReq)
    .set('Accept', 'application/json')
    .end((err, resA) => {
      parseRes=JSON.parse(resA.text)
      account=parseRes.OACCTNO,
      cbal=parseRes.OCBAL
    })
    return {
        account: 1401500157578,
        cbal:123445
        }
}

// the service
var serviceObject = {
  GetNameService: {
        GetNameServiceSoapPort: {
            GetName: splitter_function
        }
    }
};

// load the WSDL file
var xml = fs.readFileSync('./wsdl/soap.wsdl', 'utf8');
// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!<br /><a href="https://github.com/macogala/node-soap-example#readme">Git README</a>');
})

// Launch the server and listen
var port = 8001;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});