var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var getIP = require('ipware')().get_ip;
//var logger = require('./models/log-grip');
var request = require('superagent');
var core = require('./config/config-core.json');
var port = require('./config/config-port.json');
var grip = require('./config/config-grip.json');


/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));


/* Withdraw emoney */
router.post('/btnpay/ewithdraw', function(req, res, next) {
    /* Get IP first */
    var ipInfo = getIP(req)
    var clientip=ipInfo.clientIp;

    /* Log request */
    //console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));
    
    /* Inq Account First */
    dataReq =
        {
            IWSID     : req.body.id+clientip,
            IWSREF    : req.body.ref,
            IACCTNO   : req.body.account,
        }

    /* Posting Inquiry */ 
    request
    .post(core.inqA)
    .send(dataReq)
    .set('Accept', 'application/json')
    .end((err, resA) => {
        // Calling the end function will send the request
        try{
            parseRes=JSON.parse(resA.text)
            if (parseRes.OACTYPE=="S"){transcode=7079} else{transcode=7080}
            
            /* Post To Transaction */
            /*
                    TLBTPN    TerminalID(8):IDNumber/Card/Hp(16):NomerReff(12)
                    TLBDS1    channelID(3):BillerID(6):BillingID(16):NomerReff(12)
                    TLBDS2    switching/InstitusionId(6):IDNumber/Card/Hp(16)
            
            */
            var TermId      = req.body.id.toString();
            var IdNum       = req.body.hp;
            var NoReff      = req.body.ref;
            var ChannelId   = 'EWA';
            var BillerId    = 'EWALLET';
            var BillingId   = req.body.merchant;
            var InsId       = 'BTNPAY';
            var Descrip     = 'EMONEY WITHDRAW';
        
            // Change data
            dataReq =
                {
                    IWSID     : req.body.id+clientip,
                    IWSREF    : req.body.ref,
                    ITRCD     : transcode,
                    ITLID     : grip.teller,
                    ITLJS     : req.body.seq,
                    ITLUF     : ChannelId,
                    ITLB1     : grip.giro,
                    ITLB2     : req.body.amount*100,
                    ITLB15    : req.body.account,
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

/* Settlement Point */
router.post('/btnpay/settlePoint', function(req, res, next) {
    /* Get IP first */
    var ipInfo = getIP(req)
    var clientip=ipInfo.clientIp;

    /* Log request */
    //console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));
    
    /* Post To Transaction */
    /*
            TLBTPN    TerminalID(8):IDNumber/Card/Hp(16):NomerReff(12)
            TLBDS1    channelID(3):BillerID(6):BillingID(16):NomerReff(12)
            TLBDS2    switching/InstitusionId(6):IDNumber/Card/Hp(16)
    
    */
    var transcode   = 5518;
    var TermId      = req.body.id.toString();
    var IdNum       = 'RECORD='+req.body.record;
    var NoReff      = req.body.ref;
    var ChannelId   = 'EWA';
    var BillerId    = 'EWALLET';
    var BillingId   = 'SETTLEMENT POINT';
    var InsId       = 'BTNPAY';
    var Descrip     = 'SETTLEMENT POINT';
     // Change data
    dataReq =
        {
            IWSID     : req.body.id+clientip,
            IWSREF    : req.body.ref,
            ITRCD     : transcode,
            ITLID     : grip.teller,
            ITLJS     : req.body.seq,
            ITLUF     : ChannelId,
            ITLB1     : grip.glpromosi,
            ITLB2     : req.body.amount*100,
            ITLB15    : grip.giro,
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
})


/* Inq BTNPay */
router.post('/btnpay/addCard', function(req, res, next) {
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
            ICARD       : req.body.card,
            IACCT       : req.body.account
        }
    // Post 
    request
    .post(core.inqBp)
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
              "nama"      :parseRes.OSNAME
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


/* Debit Pay */
router.post('/btnpay/debitPay', function(req, res, next) {
    /* Get IP first */
    var ipInfo = getIP(req)
    var clientip=ipInfo.clientIp;

    /* Log request */
    //console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));
    
    /* Inq Account First */
    dataReq =
        {
            IWSID     : req.body.id+clientip,
            IWSREF    : req.body.ref,
            INOHP     : req.body.nohp,
            INIK      : req.body.nik,
            ICARD     : req.body.card,
            IACCT     : req.body.account
        }

    /* Posting Inquiry */ 
    request
    .post(core.inqBp)
    .send(dataReq)
    .set('Accept', 'application/json')
    .end((err, resA) => {
        // Calling the end function will send the request
        try{
            parseRes=JSON.parse(resA.text)
            if(parseRes.ORSP=="000"){
                if (parseRes.OACTYPE=="S"){transcode=7081} else{transcode=7082}            
                /* Post To Transaction */
                /*
                        TLBTPN    TerminalID(8):IDNumber/Card/Hp(16):NomerReff(12)
                        TLBDS1    channelID(3):BillerID(6):BillingID(16):NomerReff(12)
                        TLBDS2    switching/InstitusionId(6):IDNumber/Card/Hp(16)
                
                */
                var TermId      = req.body.id.toString();
                var IdNum       = req.body.nohp;
                var NoReff      = req.body.ref;
                var ChannelId   = 'EWA';
                var BillerId    = 'EWALLET';
                var BillingId   = req.body.merchant;
                var InsId       = 'BTNPAY';
                var Descrip     = 'EMONEY WITHDRAW';
            
                // Change data
                dataReq =
                {
                    IWSID     : req.body.id+clientip,
                    IWSREF    : req.body.ref,
                    ITRCD     : transcode,
                    ITLID     : grip.teller,
                    ITLJS     : req.body.seq,
                    ITLUF     : ChannelId,
                    ITLB1     : req.body.account,
                    ITLB2     : req.body.amount*100,
                    ITLB15    : grip.giro,
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
                        dataRes=
                        {
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
            }else{
                dataRes=
                {
                    "id":req.body.id,
                    "ref":req.body.ref,
                    "rsp":parseRes.ORSP,
                    "rspdesc":parseRes.ORSPDC
                }
                console.log(dataRes)
                res.send(dataRes)
                /* Logger */
                console.log(JSON.stringify(resA))
                console.log(JSON.stringify(dataRes))
            } 
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

console.log("The Gate Grip on port:"+port.grip)
router.listen(port.grip,'0.0.0.0')
