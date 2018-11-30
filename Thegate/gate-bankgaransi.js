var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var getIP = require('ipware')().get_ip;
//var logger = require('./models/log-bankgaransi');
var request = require('superagent');
var core = require('./config/config-core.json');
var garansi = require('./config/config-garansi.json');
var port = require('./config/config-port.json');

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));

/* Posting Core */
/* Transaction Posting */
router.post('/bankg/post', function(req, res, next) {
    /* Get IP first */
    var ipInfo = getIP(req)
    var clientip=ipInfo.clientIp;
    /* Post To Transaction */
    /*
            TLBTPN    TerminalID(8):IDNumber/Card/Hp(16):NomerReff(12)
            TLBDS1    channelID(3):BillerID(6):BillingID(16):NomerReff(12)
            TLBDS2    switching/InstitusionId(6):IDNumber/Card/Hp(16)
    
    */
    var TermId      = req.body.id.toString();
    var IdNum       = req.body.billid;
    var NoReff      = req.body.ref;
    var ChannelId   = 'ILO';
    var BillerId    = 'BNKGRN';
    var BillingId   = req.body.billid;
    var InsId       = 'ILOAN ';
    var Descrip     = req.body.description;
    
    /* Change data */
    dataReq =
        {
            IWSID     : req.body.id,
            IWSREF    : req.body.ref,
            ITRCD     : req.body.trcd,
            ITLID     : req.body.user ,
            ITLJS     : req.body.seq,
            ITLUF     : "ILO",
            ITLUF     : ChannelId,
            ITLB1     : req.body.tl1,
            ITLB2     : req.body.tl2,
            ITLB3     : req.body.tl3,
            ITLB4     : req.body.tl4,
            ITLB5     : req.body.tl5,
            ITLB6     : req.body.tl6,
            ITLB7     : req.body.tl7,
            ITLB8     : req.body.tl8,
            ITLB9     : req.body.tl9,
            ITLB10    : req.body.tl10,
            ITLB11    : req.body.tl11,
            ITLB12    : req.body.tl12,
            ITLB13    : req.body.tl13,
            ITLB14    : req.body.tl14,
            ITLB15    : req.body.tl15,
            ITLB16    : req.body.tl16,
            ITLB17    : req.body.tl11,
            ITLB18    : req.body.tl12,
            ITLB19    : req.body.tl13,
            ITLB20    : req.body.tl14,
            ITLBCUR   : "IDR",
            IRMADD1   : req.body.note1,
            IRMADD2   : req.body.note2,
            IRMADD3   : req.body.note3,
            ITLBTPN   : TermId.padEnd(8)    + ":" + IdNum.padEnd(16)   + ":" + NoReff.padEnd(12),
            ITLBDS1   : ChannelId.padEnd(3) + ":" + BillerId.padEnd(6) + ":" + BillingId.padEnd(16) + ":" + NoReff,
            ITLBDS2   : InsId.padEnd(6)     + ":" + IdNum.padEnd(16)   + ":" + Descrip.padEnd(16)
        }

    /* Post */ 
    request
    .post(core.post)
    .send(dataReq)
    .set('Accept', 'application/json')
    .end((err, resA) => {
        try{
            dataRes=JSON.parse(resA.text)
            res.send(
               {
                "id":dataRes.OWSID,
                "ref":dataRes.OWSREF,
                "rsp":dataRes.ORSP,
                "rspdesc":dataRes.ORSPDC,
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
        }
    })
})


console.log("The Gate Bank Garansi Running on port:"+port.garansi)
router.listen(port.garansi,'0.0.0.0')