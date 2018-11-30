var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var getIP = require('ipware')().get_ip;
var request = require('superagent');
var core = require('./config/config-core.json');
var port = require('./config/config-port.json');
var key = require('./config/config-key.json');


/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));

/* function key */
function getkey(id) {
  return key.filter(
    function(vakey) {
      return vakey.id == id
    }
  );
}

/* protect Key */
router.use('/', function(req, res, next) {
    /* logger */
    var ipInfo = getIP(req)
    var clientip=ipInfo.clientIp;
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    console.log(
      "Request from client: " + clientip +
      " url:" + fullUrl +
      " key: " + JSON.stringify(req.headers.key) + " "+ JSON.stringify(req.body) + " "
    )
    
    /* Cek The Key */
    var cekkey = getkey(req.body.id)
    if (req.headers.key !== cekkey[0].key){
       dataRes=
             {
              "id"      :req.body.id,
              "ref"     :req.body.ref,
              "rsp"     :"998",
              "rspdesc" :"Access Denied"
            };
        res.send(dataRes);
                /* Logger */
        console.log("Response to client: "+ clientip +" "+JSON.stringify(dataRes))
    }
    else{
      next()
    } 
})

/* Transaction VA */
/* Inquiry VA */
router.post('/va/inqVA', function(req, res, next) {
    // Get IP first
    var ipInfo    = getIP(req)
    var clientip  =ipInfo.clientIp;

    // Change data
    var dataReq =
        {
            IWSID   : req.body.id,
            IWSREF  : req.body.ref,
            IVANO   : req.body.va
        };
    // Post 
    request
    .post(core.inqVA)
    .send(dataReq)
    .set('Accept', 'application/json')
    .end((err, resA) => {
        // Calling the end function will send the request
        try{
          parseRes=JSON.parse(resA.text)
          dataRes=
             {
              "id"              : req.body.id,
              "ref"             : parseRes.OWSREF,
              "rsp"             : parseRes.ORSP,
              "rspdesc"         : parseRes.ORSPDC,
              "va"              : parseRes.OVANO,
              "nama"            : parseRes.OUNSTNM,
              "layanan"         : parseRes.OUNFAKU,
              "kodelayanan"     : parseRes.OUNPSTU,
              "jenisbayar"      : parseRes.OUNNPST,
              "kodejenisbyr"    : parseRes.OUNIDSM,
              "noid"            : parseRes.OUNTEST,
              "tagihan"         : parseRes.OUNAMTT,
              "flag"            : parseRes.OUNRSVF,
              "description"     : parseRes.OUNDESC,
              "terbayar"        : parseRes.OUNAMPD,
              "expired"         : parseRes.OUNRSV3,
              "reserve"         : parseRes.OUNRSV2,
              "angkatan"        : parseRes.OUNANKT,
              "createdate"      : parseRes.OUNORD8,
              "createtime"      : parseRes.OUNTIME
            }
        }
        catch(e){
          dataRes={
            "id"        :req.body.id,
            "ref"       :req.body.ref,
            "rsp"       :"999",
            "rspdesc"   :"Generally Error"
          }
        }
        res.send(dataRes)
        /* Logger */
        console.log("Request to Core: "+ JSON.stringify(resA))
        console.log("Response to client: "+ clientip +" "+JSON.stringify(dataRes))
    })
})

/* Create VA */
router.post('/va/createVA', function(req, res, next) {
    // Get IP first
    var ipInfo    = getIP(req)
    var clientip  = ipInfo.clientIp;  

    // Change data
    dataReq =
        {
            IWSID       : req.body.id,
            IWSREF      : req.body.ref,
            IVANO       : req.body.va,
            IUNSTNM     : req.body.nama,
            IUNFAKU     : req.body.layanan,
            IUNPSTU     : req.body.kodelayanan,
            IUNNPST     : req.body.jenisbayar,
            IUNIDSM     : req.body.kodejenisbyr,
            IUNTEST     : req.body.noid,
            IUNNIU      : req.body.nogiro,
            IUNAMTT     : req.body.tagihan,
            IUNRSVF     : req.body.flag,
            IUNRSV2     : req.body.reserve,
            IUNANKT     : req.body.angkatan,
            IUNRSV3     : req.body.expired,
            IUNDESC     : req.body.description
        }
    // Post 
    request
    .post(core.createVA)
    .send(dataReq)
    .set('Accept', 'application/json')
    .end((err, resA) => {
        // Calling the end function will send the request
        try{
          parseRes=JSON.parse(resA.text)
          dataRes=
             {
              "id"        :req.body.id,
              "ref"       :parseRes.OWSREF,
              "rsp"       :parseRes.ORSP,
              "rspdesc"   :parseRes.ORSPDC,
              "va"        :parseRes.OVANO
            }
        }
        catch(e){
          dataRes={
            "id"        :req.body.id,
            "ref"       :req.body.ref,
            "rsp"       :"999",
            "rspdesc"   :"Generally Error"
          }
        }
        res.send(dataRes);
        /* Logger */
        console.log("Request to Core: "+ JSON.stringify(resA))
        console.log("Response to client: "+ clientip +" "+JSON.stringify(dataRes))
    })
})

/* Delete VA */
router.post('/va/deleteVA', function(req, res, next) {
    // Get IP first
    var ipInfo    = getIP(req)
    var clientip  = ipInfo.clientIp;

    // Change data
    dataReq =
        {
            IWSID   : req.body.id,
            IWSREF  : req.body.ref,
            IVANO   : req.body.va
        }
    // Post 
    request
    .post(core.deleteVA)
    .send(dataReq)
    .set('Accept', 'application/json')
    .end((err, resA) => {
        // Calling the end function will send the request
        try{
          parseRes=JSON.parse(resA.text)
          dataRes=
             {
              "id"        :req.body.id,
              "ref"       :parseRes.OWSREF,
              "rsp"       :parseRes.ORSP,
              "rspdesc"   :parseRes.ORSPDC,
              "va"        :parseRes.OVANO
            }
        }
        catch(e){
          dataRes={
            "id"        :req.body.id,
            "ref"       :req.body.ref,
            "rsp"       :"999",
            "rspdesc"   :"Generally Error"
          }
        }
        res.send(dataRes)
        /* Logger */
        console.log("Request to Core: "+ JSON.stringify(resA))
        console.log("Response to client: "+ clientip +" "+JSON.stringify(dataRes))
    })
})

/* Update VA */
router.post('/va/updVA', function(req, res, next) {
    // Get IP first
    var ipInfo = getIP(req)
    var clientip=ipInfo.clientIp;    

    // Change data
    dataReq =
        {
            IWSID       : req.body.id,
            IWSREF      : req.body.ref,
            IVANO       : req.body.va,
            IUNSTNM     : req.body.nama,
            IUNFAKU     : req.body.layanan,
            IUNPSTU     : req.body.kodelayanan,
            IUNNPST     : req.body.jenisbayar,
            IUNIDSM     : req.body.kodejenisbyr,
            IUNTEST     : req.body.noid,
            IUNNIU      : req.body.nogiro,
            IUNAMTT     : req.body.tagihan,
            IUNRSVF     : req.body.flag,
            IUNRSV2     : req.body.reserve,
            IUNANKT     : req.body.angkatan,
            IUNRSV3     : req.body.expired,
            IUNDESC     : req.body.description
        }
    // Post 
    request
    .post(core.updVA)
    .send(dataReq)
    .set('Accept', 'application/json')
    .end((err, resA) => {
        // Calling the end function will send the request
        try{
          parseRes = JSON.parse(resA.text)
          dataRes=
             {
              "id"        :req.body.id,
              "ref"       :parseRes.OWSREF,
              "rsp"       :parseRes.ORSP,
              "rspdesc"   :parseRes.ORSPDC,
              "va"        :parseRes.OVANO
            }
        }
        catch(e){
          dataRes={
            "id"        :req.body.id,
            "ref"       :req.body.ref,
            "rsp"       :"999",
            "rspdesc"   :"Generally Error"
          }
        }
        res.send(dataRes)
        /* Logger */
        console.log("Request to Core: "+ JSON.stringify(resA))
        console.log("Response to client: "+ clientip +" "+JSON.stringify(dataRes))
    })
})

console.log("The Gate VA Universitas Running on port:"+port.universitas)
router.listen(port.universitas,'0.0.0.0')