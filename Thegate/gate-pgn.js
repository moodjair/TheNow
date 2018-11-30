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
    }
    else{
      next()
    } 
})

/* Inquiry Account */
router.post('/pgn/acc', function(req, res, next) {
    /* Get IP first */
    var ipInfo = getIP(req)
    var clientip=ipInfo.clientIp;
    
    /* Log request */
    //logger.info(JSON.stringify(req.headers));
    //logger.info(JSON.stringify(req.body));
    
    /* Change Data */
    dataReq =
           {
            IWSID: req.body.id+clientip,
            IWSREF: req.body.ref,
            IID:'PGN',
            IACCTNO: req.body.account
        }
    request
    .post(core.inqA)
    .send(dataReq)
    .set('Accept', 'application/json')
    .end((err, resA) => {
        // Calling the end function will send the request
        try{
          parseRes=JSON.parse(resA.text)
          dataRes=
             {
              "id"      :req.body.id,
              "ref"     :parseRes.OWSREF,
              "rsp"     :parseRes.ORSP,
              "rspdesc" :parseRes.ORSPDC,
              "account" :parseRes.OACCTNO,
              "status"  :parseRes.OSTATUS,
              "cbal"    :parseRes.OCBAL,
              "hold"    :parseRes.OHOLD,
              "nama"    :parseRes.OSNAME
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
        console.log("Request to Core: "+ JSON.stringify(resA))
        console.log("Response to client: "+ clientip +" "+JSON.stringify(dataRes))
    })
})

console.log("The Gate PGN Running on port:"+port.pgn)
router.listen(port.pgn,'0.0.0.0')