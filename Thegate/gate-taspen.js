var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var getIP = require('ipware')().get_ip;
//var logger = require('./models/log-taspen');
var request = require('superagent');
var core = require('./config/config-core.json');
var taspen = require('./config/config-taspen.json');
var port = require('./config/config-port.json');


/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));

/* protect Key */
router.use('/', function(req, res, next) {
    /* logger */
    var ipInfo = getIP(req)
    var clientip=ipInfo.clientIp;
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    console.log(
      "Request from client: " + clientip +
      " url:" + fullUrl +
      " "+ JSON.stringify(req.body) + " "
    )
    next()
})

/* Inquiry Account */
router.post('/taspen/InqAcc', function(req, res, next) {
        // Get IP first
    var ipInfo = getIP(req)
    var clientip=ipInfo.clientIp;

    dataReq =
           {
            IWSID: req.body.IWSID+clientip,
            IWSREF: req.body.IWSREF,
            IACCTNO: req.body.IREK
        }
    request
    .post(core.inqA)
    .send(dataReq)
    .set('Accept', 'application/json')
    .end((err, resA) => {
        // Calling the end function will send the request
        try{
          dataRes=JSON.parse(resA.text)
          if(dataRes.OSCCODE!='TT'){
          res.send(
             {
              "OACCTNO"     :0,
              "OSNAME"      :'',
              "OCIFNO"      :'',
              "OSTATUS"     :0,
              "ORSP"        :'001',
              "ORSPDC"      :'Account Number Not Found'
            })
          }else{
          res.send(
             {
              "OACCTNO"     :dataRes.OACCTNO,
              "OSNAME"      :dataRes.OSNAME,
              "OCIFNO"      :dataRes.OCIFNO,
              "OSTATUS"     :dataRes.OSTATUS,
              "ORSP"        :dataRes.ORSP,
              "ORSPDC"      :dataRes.ORSPDC
            })
          }
                  /* Logger */
        console.log("Request to Core: "+ JSON.stringify(resA))
        console.log("Response to client: "+ clientip +" "+JSON.stringify(dataRes))
        }
        catch(e){
          dataRes={
            "ORSP":"999",
            "ORSPDC":"Generally Error"
          }
          res.send(dataRes)
                  /* Logger */
        console.log("Request to Core: "+ JSON.stringify(resA))
        console.log("Response to client: "+ clientip +" "+JSON.stringify(dataRes))
        }
    })
})


/* Inquiry Account */
router.post('/taspen/openBlock', function(req, res, next) {
        // Get IP first
    var ipInfo = getIP(req)
    var clientip=ipInfo.clientIp;
    var wsidori = req.body.IWSID;

    dataReq =
           {
            IWSID       : req.body.IWSID+clientip,
            IWSREF      : req.body.IWSREF,
            IREK        : req.body.IREK
        }
    request
    .post(core.openBlock)
    .send(dataReq)
    .set('Accept', 'application/json')
    .end((err, resA) => {
        // Calling the end function will send the request
        try{
          dataRes=JSON.parse(resA.text)
          res.send(
             {
              "OWSID"       :wsidori,
              "OWSREF"      :dataRes.OWSREF,
              "ORSP"        :dataRes.ORSP,
              "ORSPDC"      :dataRes.ORSPDC,
              "OREK"        :dataRes.OREK,
              "ONAME"       :dataRes.ONAME,
              "DATAAC"      :dataRes.DATAAC
            })
          /* Logger */
          console.log("Request to Core: "+ JSON.stringify(resA))
          console.log("Response to client: "+ clientip +" "+JSON.stringify(dataRes))
        }
        catch(e){
          dataRes={
            "ORSP":"999",
            "ORSPDC":"Generally Error"
          }
          res.send(dataRes)
          /* Logger */
          console.log("Request to Core: "+ JSON.stringify(resA))
          console.log("Response to client: "+ clientip +" "+JSON.stringify(dataRes))
        }
    })
})

console.log("The Gate Taspen Running on port:"+port.taspen)
router.listen(port.taspen,'0.0.0.0')
