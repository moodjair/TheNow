var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var getIP = require('ipware')().get_ip;
//var logger = require('./models/log-rumahsakit');
var request = require('superagent');
var core = require('./config/config-core.json');
var rs1 = require('./config/config-rumahsakit.json');
var port = require('./config/config-port.json');

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));

/* cek the key */
router.use('/', function(req, res, next) {
    /* Cek The Key */
    if (req.headers.key !== rs1.key){
       dataRes=
             {
              "id"      :req.body.id,
              "ref"     :req.body.ref,
              "rsp"     :"998",
              "rspdesc" :"Access Denied"
            };
        res.send(dataRes);
    }
    else{
      next()
    } 
})


/* Transaction VA */
/* Inquiry VA */
router.post('/rs1/inqVA', function(req, res, next) {
    // Get IP first
    var ipInfo    = getIP(req)
    var clientip  =ipInfo.clientIp;

    /* Log request */
    //console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));

    // Change data
    var dataReq =
        {
            IWSID   : req.body.id+clientip,
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
              "jenisbayar"      : parseRes.OUNNPST,
              "noid"            : parseRes.OUNTEST,
              "tagihan"         : parseRes.OUNAMTT,
              "flag"            : parseRes.OUNRSVF,
              "expired"         : parseRes.OUNRSV3,
              "description"     : parseRes.OUNDESC,
              "terbayar"        : parseRes.OUNAMPD,
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
        console.log(JSON.stringify(resA))
        console.log(JSON.stringify(dataRes))
    })
})

/* Create VA */
router.post('/rs1/createVA', function(req, res, next) {
    // Get IP first
    var ipInfo    = getIP(req)
    var clientip  = ipInfo.clientIp;  

    /* Log request */
    //console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));

    // Change data
    dataReq =
        {
            IWSID       : req.body.id+clientip,
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
            IUNANKT     : req.body.tahun,
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
        console.log(JSON.stringify(resA))
        console.log(JSON.stringify(dataRes))
    })
})

/* Delete VA */
router.post('/rs1/deleteVA', function(req, res, next) {
    // Get IP first
    var ipInfo    = getIP(req)
    var clientip=ipInfo.clientIp;    

    /* Log request */
    //console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));

    // Change data
    dataReq =
        {
            IWSID   : req.body.id+clientip,
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
        console.log(JSON.stringify(resA))
        console.log(JSON.stringify(dataRes))
    })
})

/* Update VA */
router.post('/rs1/updVA', function(req, res, next) {
    // Get IP first
    var ipInfo = getIP(req)
    var clientip=ipInfo.clientIp;    

    /* Log request */
    //console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));

    // Change data
    dataReq =
        {
            IWSID       : req.body.id+clientip,
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
            IUNANKT     : req.body.tahun,
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
        console.log(JSON.stringify(resA))
        console.log(JSON.stringify(dataRes))
    })
})

console.log("The Gate rumahsakit Running on port:"+port.rumahsakit)
router.listen(port.rumahsakit,'0.0.0.0')