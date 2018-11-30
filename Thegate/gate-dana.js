var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var getIP = require('ipware')().get_ip;
//var logger = require('./models/log-dana');
var request = require('superagent');
var core = require('./config/config-core.json');
var dana = require('./config/config-dana.json');
var port = require('./config/config-port.json');

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));

/* cek the key */
router.use('/', function(req, res, next) {
    
    /* Cek The Key */
    if (req.headers.key !== dana.key){
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

/* Delete Master */
router.post('/dana/delNo', function(req, res, next) {
    // Get IP first
    var ipInfo    = getIP(req)
    var clientip  = ipInfo.clientIp;  

    /* Log request */
    //console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));

    // Change data
    dataReq =
        {
            IWSID       : req.body.id,
            IWSREF      : req.body.ref,
            INOHP       : req.body.nohp
        }
    // Post 
    request
    .post(core.delDana)
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
              "nohp"      :parseRes.ONOHP
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

/* Add dana Master */
router.post('/dana/addNo', function(req, res, next) {
    // Get IP first
    var ipInfo    = getIP(req)
    var clientip  = ipInfo.clientIp;  

    /* Log request */
    //console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));

    // Change data
    dataReq =
        {
            IWSID       : req.body.id,
            IWSREF      : req.body.ref,
            INOHP       : req.body.nohp,
            INIK        : req.body.nik,
            ICARD       : req.body.card
        }
    // Post 
    request
    .post(core.addDana)
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
              "nohp"      :parseRes.ONOHP
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


/* Withdraw emoney */
router.post('/dana/debit', function(req, res, next) {
    /* Get IP first */
    var ipInfo = getIP(req)
    var clientip=ipInfo.clientIp;

    /* Log request */
    //console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));
    
    /* Inq Account First */
    dataReq =
        {
            IWSID     : req.body.id,
            IWSREF    : req.body.ref,
            INOHP     : req.body.nohp,
        }

    /* Posting Inquiry */ 
    request
    .post(core.InqDana)
    .send(dataReq)
    .set('Accept', 'application/json')
    .end((err, resA) => {
        // Calling the end function will send the request
        try{
            parseRes=JSON.parse(resA.text)
            if (parseRes.OACTP=="S"){transcode=8463} else{transcode=8464}
            
            /* Post To Transaction */
            /*
                    TLBTPN    TerminalID(8):IDNumber/Card/Hp(16):NomerReff(12)
                    TLBDS1    channelID(3):BillerID(6):BillingID(16):NomerReff(12)
                    TLBDS2    switching/InstitusionId(6):IDNumber/Card/Hp(16)
            
            */
            var TermId      = req.body.id.toString();
            var IdNum       = req.body.nohp;
            var NoReff      = req.body.ref;
            var ChannelId   = 'DDN';
            var BillerId    = req.body.merchant;
            var BillingId   = 'DEBIT DANA';
            var InsId       = 'DANADB';
            var Descrip     = 'DEBIT DANA';
            var rekening    = parseRes.OACCT;
        
            // Change data
            dataReq =
                {
                    IWSID     : req.body.id+clientip,
                    IWSREF    : req.body.ref,
                    ITRCD     : transcode,
                    ITLID     : dana.teller,
                    ITLJS     : req.body.ref,
                    ITLUF     : ChannelId,
                    ITLB15    : dana.giro,
                    ITLB2     : req.body.amount*100,
                    ITLB1     : rekening,
                    ITLB16    : req.body.amount*100,
                    ITLBCUR   : "IDR",
                    ITLBTPN   : TermId.padEnd(8)    + ":" + IdNum.padEnd(16)   + ":" + NoReff.padEnd(12),
                    ITLBDS1   : ChannelId.padEnd(3) + ":" + BillerId.padEnd(6) + ":" + BillingId.padEnd(15) + ":" + NoReff.padEnd(12),
                    ITLBDS2   : InsId.padEnd(6)     + ":" + IdNum.padEnd(16)   + ":" + Descrip.padEnd(16)
        
                }
            /* Posting Transaction */ 
            request
            .post(core.post)
            .send(dataReq)
            .set('Accept', 'application/json')
            .end((err, resB) => {
                // Calling the end function will send the request
                try{
                  parseRes=JSON.parse(resB.text)
                  dataRes=
                     {
                      "id":req.body.id,
                      "ref":parseRes.OWSREF,
                      "rsp":parseRes.ORSP,
                      "rspdesc":parseRes.ORSPDC,
                     }
                }
                catch(e){
                  dataRes={
                    "id":req.body.id,
                    "ref":req.body.ref,
                    "rsp":"999",
                    "rspdesc":"Generally Error"
                  }
                }
                res.send(dataRes)
                /* Logger */
                console.log(JSON.stringify(resB))
                console.log(JSON.stringify(dataRes))
            })
        }
        catch(e){
            dataRes={
                "id":req.body.id,
                "ref":req.body.ref,
                "rsp":"999",
                "rspdesc":"Generally Error"
            }
            res.send(dataRes)
            /* Logger */
            console.log(JSON.stringify(resA))
            console.log(JSON.stringify(dataRes))
        }
    })
})


console.log("The Gate Debit Dana Running on port:"+port.dana)
router.listen(port.dana,'0.0.0.0')
