var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var request = require('superagent');
require('superagent-proxy')(request);
//var logger = require('./models/log-callback');
var core = require('./config/config-core.json');
var port = require('./config/config-port.json');
var cb = require('./config/config-callback.json');

let proxy = 'http://172.16.10.10:8080';

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));

/* Transaction VA */
/* callback */
router.get('/cb/in9957', function(req, res, next) {

    console.log("Request from Core: "+JSON.stringify(req.body));
    // Change data
    var dataReq =
        {
            "AppKey"      : cb.client9957.AppKey,
            "AppSecret"   : cb.client9957.AppSecret,
            "va"          : req.query.ivano,
            "nama"        : req.query.ivastnm,
            "teller"      : req.query.ivausid,
            "transcode"   : req.query.ivatcd,
            "seq"         : req.query.ivaseq,
            "tgl"         : req.query.ivatdt,
            "jam"         : req.query.ivaptim,
            "amount"      : req.query.ivaptot,
            "revflag"     : req.query.ivaprvf,
            "revseq"      : req.query.ivarvsq,
            "revjam"      : req.query.ivaprvt,
            "tagihan"     : req.query.ivaamtt,
            "terbayar"    : req.query.ivaampd
        };

    // Post 
    request
    .post(cb.in9957)
    .proxy(proxy)
    //.type('form')
    .send(dataReq)
    .end((err, resA) => {
        // Calling the end function will send the request
        try{
          dataRes=JSON.parse(resA.text) 
          if (dataRes.rsp=="000"){
            res.send('1')
          }
          else {
              res.send('0')  
          } 
          
        }
        catch(e){
          dataRes=('0')
          res.send(dataRes)
        }
        /* Logger */
        console.log("Request to host: "+JSON.stringify(resA))
        console.log("Response to core: "+JSON.stringify(dataRes))
    })
})

console.log("The Gate CallBack Running on port:"+port.cb)
router.listen(port.cb,'0.0.0.0')
