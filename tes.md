# TECHNICAL SPECIFICATION DOCUMENT VA

### A.  Flow Transaksi
Flow Transaksi

  1.  Flow Inquiry VA, Create VA, Update VA, Delete VA
    HOST  ------request------>  BTN
    HOST  <-----response------  BTN

  2.  Flow Callback
    BTN  ------request------>  HOST
    BTN  <-----response------  HOST

  3.  Flow Rekon Transksi
    BTN  ---------ftp------->  HOST

### B.Format Virtual Account
Format VA BTN

  Format VA:  (Prefix_VA)(1) 
        + (Kode_Institusi)(4) 
        + (Kode_Payment)(3) 
        + (Customer_Number)(9)
  - Prefix_VA : “9”
  - Kode_Institusi  : “9957” (Tergantung parameter dari Operasional)
  - Kode_Payment  : “001” (Tergantung parameter dari Operasional)
  - Customer_Number : "123456789"
  - Length  of VA : 17
  Example : 99957001000009957

### C.  Inquiry VA 


'''sh
===============================================================================
        ** TECHNICAL SPECIFICATION DOCUMENT **
                  VA RS 
              16 Oktober 2018
       ___     _     _  _   _  __    ___   _____   _  _ 
      | _ )   /_\   | \| | | |/ /   | _ ) |_   _| | \| |
      | _ \  / _ \  | .` | | ' <    | _ \   | |   | .` |
      |___/ /_/ \_\ |_|\_| |_|\_\   |___/   |_|   |_|\_|

===============================================================================

A.  Flow Transaksi

  1.  Flow Inquiry VA, Create VA, Update VA, Delete VA
    
    HOST  ------request------>  BTN
    HOST  <-----response------  BTN

  2.  Flow Callback

    BTN  ------request------>  HOST
    BTN  <-----response------  HOST

  3.  Flow Rekon Transksi

    BTN  ---------ftp------->  HOST

    
B.  Format Virtual Account

  Format VA:  (Prefix_VA)(1) 
        + (Kode_Institusi)(4) 
        + (Kode_Payment)(3) 
        + (Customer_Number)(9)
  - Prefix_VA : “9”
  - Kode_Institusi  : “9957” (Tergantung parameter dari Operasional)
  - Kode_Payment  : “001” (Tergantung parameter dari Operasional)
  - Customer_Number : "123456789"
  - Length  of VA : 17
  Example : 99957001000009957


C.  Inquiry VA

  1.  URL
    Url yang digunakan adalah http://<ip_address:port>/rs1/inqVA
    Metode : POST
    Header
    - Content-Type  : application/json 
    - key     : "key"

  2.  Request
  ---------------------------------------------------------------------------
  Field   Type  MaxLen  Format/Desc
  ---------------------------------------------------------------------------
  id    string  7 Id 
  ref   string  12  No. Reff (Unique pertransaction)
  va    string  19  Nomer VA 
  ---------------------------------------------------------------------------

  Contoh Request
  ---------------------------------------------------------------------------
  {
    "id"    :"id",
    "ref"   :"877556783",
    "va"    :"99957001000009991"
  }
  ---------------------------------------------------------------------------

  2.  Response
  ---------------------------------------------------------------------------
  Field   Type  MaxLen  Format/Desc
  ---------------------------------------------------------------------------
  id    string  7 Id 
  ref   string  12  No. Reff (Unique pertransaction)
  rsp   string  19  Respon Code, “000” = Sukses 
  rspdesc   string  50  Respon Description
  va    string  19  Nomer VA
  nama    string  40  Nama
  layanan   string  40  Layanan
  jenisbayar  string  40  Jenis Bayar
  noid    string  20  No ID 
  tagihan   numeric 19  Tagihan
  flag    string  1 Flag (F=Full P=Partial)
  expired   string  10  Expired
  description   string  60  Description
  terbayar  numeric 19  Amount Terbayar
  createdate  numeric 6 Date Create (DDMMYY)
  createtime  numeric 6 Time Create (HHMMSS)
  ---------------------------------------------------------------------------


  Contoh Response
  ---------------------------------------------------------------------------
  {
      "id"    : "id",
      "ref"   : "877556783",
      "rsp"   : "000",
      "rspdesc"   : "Transaction Success.",
      "va"    : "99957001000009991",
      "nama"    : "DEWI YUNDARI",
      "layanan"   : "RAWAT INAP",
      "jenisbayar"  : "TAGIHAN RAWAT INAP",
      "noid"    : "08888489242",
      "tagihan"   : 1000000,
      "flag"    : "F",
      "description" : "JALAN LEBAR DAUN WAY HITAM",
      "terbayar"    : 0,
      "createdate"  : 18112014,
      "createtime"  : 81218
  }
  ---------------------------------------------------------------------------

D.  Create VA

  1.  URL
    Url yang digunakan adalah http://<ip_address:port>/rs1/createVA
    Metode : POST
    Header
    - Content-Type  : application/json 
    - key     : "key"

  2.  Request
  ---------------------------------------------------------------------------
  Field   Type  MaxLen  Format/Desc
  ---------------------------------------------------------------------------
  id    string  7 Id 
  ref   string  12  No. Reff (Unique pertransaction)
  va    string  19  Nomer VA
  nama    string  40  Nama
  layanan   string  40  Layanan
  jenisbayar  string  40  Jenis Bayar
  noid    string  20  No ID 
  tagihan   numeric 19  Tagihan
  flag    string  1 Flag (F=Full P=Partial)
  tahun   string  4 tahun
  expired   string  10  Expired
  description   string  60  Description
  ---------------------------------------------------------------------------

  Contoh Request
  ---------------------------------------------------------------------------
  {
    "id"    :"id",
    "ref"   :"123456789012",               
    "va"    :"99957001000009991",
    "nama"    :"DEWI YUNDARI",
    "layanan" :"RAWAT INAP",
    "jenisbayar"  :"TAGIHAN RAWAT INAP",
    "noid"    :"08888489242",
    "tagihan" :"1000000",
    "flag"    :"F",
    "tahun"       :"2018",
    "expired" :"",
    "description" :"JALAN LEBAR DAUN WAY HITAM"
  }
  ---------------------------------------------------------------------------

  2.  Response
  ---------------------------------------------------------------------------
  Field   Type  MaxLen  Format/Desc
  ---------------------------------------------------------------------------
  id    string  7 Id 
  ref   string  12  No. Reff (Unique pertransaction)
  rsp   string  19  Respon Code, “000” = Sukses 
  rspdesc   string  50  Respon Description
  va    string  19  Nomer VA
  ---------------------------------------------------------------------------


  Contoh Response
  ---------------------------------------------------------------------------
  {
      "id"  : "id",
      "ref" : "123456789012",
      "rsp" : "000",
      "rspdesc" : "VA Created 99957001000009991",
      "va"  : "99957001000009991"
  }
  ---------------------------------------------------------------------------

E.  Update VA

  1.  URL
    Url yang digunakan adalah http://<ip_address:port>/rs1/updVA
    Metode : POST
    Header
    - Content-Type  : application/json 
    - key     : "key"

  2.  Request
  ---------------------------------------------------------------------------
  Field   Type  MaxLen  Format/Desc
  ---------------------------------------------------------------------------
  id    string  7 Id 
  ref   string  12  No. Reff (Unique pertransaction)
  va    string  19  Nomer VA
  nama    string  40  Nama
  layanan   string  40  Layanan
  jenisbayar  string  40  Jenis Bayar
  noid    string  20  No ID 
  tagihan   numeric 19  Tagihan
  flag    string  1 Flag (F=Full P=Partial)
  tahun   string  4 tahun
  expired   string  10  Expired
  description   string  60  Description
  ---------------------------------------------------------------------------

  Contoh Request
  ---------------------------------------------------------------------------
  {
    "id"    :"id",
    "ref"   :"123456789012",               
    "va"    :"99957001000009991",
    "nama"    :"DEWI YUNDARI",
    "layanan" :"RAWAT INAP",
    "jenisbayar"  :"TAGIHAN RAWAT INAP",
    "noid"    :"08888489242",
    "tagihan" :"1000000",
    "flag"    :"F",
    "tahun"       :"2018",
    "expired" :"",
    "description" :"JALAN LEBAR DAUN WAY HITAM"
  }
  ---------------------------------------------------------------------------

  2.  Response
  ---------------------------------------------------------------------------
  Field   Type  MaxLen  Format/Desc
  ---------------------------------------------------------------------------
  id    string  7 Id 
  ref   string  12  No. Reff (Unique pertransaction)
  rsp   string  19  Respon Code, “000” = Sukses 
  rspdesc   string  50  Respon Description
  va    string  19  Nomer VA
  ---------------------------------------------------------------------------


  Contoh Response
  ---------------------------------------------------------------------------
  {
      "id"  : "id",
      "ref" : "123456789012",
      "rsp" : "000",
      "rspdesc" : "VA Updated 99957001000009991",
      "va"  : "99957001000009991"
  }
  ---------------------------------------------------------------------------

F.  Delete VA

  1.  URL
    Url yang digunakan adalah http://<ip_address:port>/rs1/deleteVA
    Metode : POST
    Header
    - Content-Type  : application/json 
    - key     : "key"

  2.  Request
  ---------------------------------------------------------------------------
  Field   Type  MaxLen  Format/Desc
  ---------------------------------------------------------------------------
  id    string  7 Id 
  ref   string  12  No. Reff (Unique pertransaction)
  va    string  19  Nomer VA
  ---------------------------------------------------------------------------

  Contoh Request
  ---------------------------------------------------------------------------
  {
    "id"  :"id",
    "ref" :"123456789012",               
    "va"  :"99957001000009991"
  }
  ---------------------------------------------------------------------------

  2.  Response
  ---------------------------------------------------------------------------
  Field   Type  MaxLen  Format/Desc
  ---------------------------------------------------------------------------
  id    string  7 Id 
  ref   string  12  No. Reff (Unique pertransaction)
  rsp   string  19  Respon Code, “000” = Sukses 
  rspdesc   string  50  Respon Description
  va    string  19  Nomer VA
  ---------------------------------------------------------------------------


  Contoh Response
  ---------------------------------------------------------------------------
  {
      "id"  : "id",
      "ref" : "123456789012",
      "rsp" : "000",
      "rspdesc" : "VA Deleted 99957001000009991",
      "va"  : "99957001000009991"
  }
  ---------------------------------------------------------------------------

G.  CallBack

  1.  Url
    Mengikuti URL dari Host

  2.  Request
  ---------------------------------------------------------------------------
  Field   Type  MaxLen  Format/Desc
  ---------------------------------------------------------------------------
  va    string  19  Nomer VA
  nama    string  40  Nama
  teller    string  7 Teller ID
  transcode string  4 Transcode
  seq     string  7 urnal Sequence
  tgl   string  6 Tanggal Transaksi (DDMMYY)
  jam   string  6 Jam Transaksi (HHMMSS)
  amount    string  19  Amount Transaksi
  revflag   string  1 Reversal Flag
          Jika Flag berisi “Y” maka transaksi ini
          adalah transaksi reversal (Pembatalan
          Pembayaran)
  revseq    string  7 Jurnal Sequence yang di reversal
  revjam    string  6 Jam Reveral (HHMMSS)
  tagihan   string  19  Tagihan
  terbayar  string  19  Terbayar
  ---------------------------------------------------------------------------

  Contoh Request
  ---------------------------------------------------------------------------
  {
    "va"    : "99957001000009957",
    "nama"    : "DEWI YUNDARI",
    "teller"  : "3000001",
    "transcode" : "7046",
    "seq"   : "123456",
    "tgl"   : "311218",
    "jam"   : "090909",
    "amount"  : "900000",
    "revflag" : "Y",
    "revseq"  : "123456",
    "revjam"  : "090909",
    "tagihan" : "1000000",
    "terbayar"  : "900000"  
  }
  ---------------------------------------------------------------------------

  2.  Response
  ---------------------------------------------------------------------------
  Field   Type  MaxLen  Format/Desc
  ---------------------------------------------------------------------------
  rsp   string  19  Respon Code, “000” = Sukses 
  rspdesc   string  50  Respon Description
  ---------------------------------------------------------------------------


  Contoh Response
  ---------------------------------------------------------------------------
  {
      "ref"   : "123456789012",
      "rsp"   : "000",
  }
  ---------------------------------------------------------------------------

H.  Respon Code

  Respon “000” adalah respon sukses. Selain itu adalah respon gagal.
  List Respon Code
  ---------------------------------------------------------------------------
  Rsp   Respon Description
  ---------------------------------------------------------------------------
  000   Success
  001   Account VA Not Found
  002   Invalid Institusion Code
  003   Invalid Payment Type
  004   Institusion Parameter Account not Found
  005   Institusion Account number invalid
  006   Number VA already Exist
  007   Invalid VA Number
  098   Is Switch a daymode or Night Mode (Core EOD)
  099   Not Authorize (Id not Autorize)
  998   Access Denied
  999   General Error (Timeout)







===============================================================================
       ___     _     _  _   _  __    ___   _____   _  _ 
      | _ )   /_\   | \| | | |/ /   | _ ) |_   _| | \| |
      | _ \  / _ \  | .` | | ' <    | _ \   | |   | .` |
      |___/ /_/ \_\ |_|\_| |_|\_\   |___/   |_|   |_|\_|

===============================================================================
'''



##### 1. URL 
Url yang digunakan adalah http://<ip_address:port>/rs1/inqVA
Metode : POST
Header
  - Content-Type  : application/json 
  - key     : "key"

##### 1. Request 
Request Body
| Field | Type | Maxlength | Format/Desc |
| ------ | ------ | ------ | ------ |
|id     |string  |7 |Id |
|ref    |string |12|No. Reff (Unique pertransaction)|



  Contoh Request
  {
    "id"    :"id",
    "ref"   :"877556783",
    "va"    :"99957001000009991"
  }


Response
  ---------------------------------------------------------------------------
  Field   Type  MaxLen  Format/Desc
  ---------------------------------------------------------------------------
  id    string  7 Id 
  ref   string  12  No. Reff (Unique pertransaction)
  rsp   string  19  Respon Code, “000” = Sukses 
  rspdesc   string  50  Respon Description
  va    string  19  Nomer VA
  nama    string  40  Nama
  layanan   string  40  Layanan
  jenisbayar  string  40  Jenis Bayar
  noid    string  20  No ID 
  tagihan   numeric 19  Tagihan
  flag    string  1 Flag (F=Full P=Partial)
  expired   string  10  Expired
  description   string  60  Description
  terbayar  numeric 19  Amount Terbayar
  createdate  numeric 6 Date Create (DDMMYY)
  createtime  numeric 6 Time Create (HHMMSS)
  ---------------------------------------------------------------------------


  Contoh Response
  ---------------------------------------------------------------------------
  {
      "id"    : "id",
      "ref"   : "877556783",
      "rsp"   : "000",
      "rspdesc"   : "Transaction Success.",
      "va"    : "99957001000009991",
      "nama"    : "DEWI YUNDARI",
      "layanan"   : "RAWAT INAP",
      "jenisbayar"  : "TAGIHAN RAWAT INAP",
      "noid"    : "08888489242",
      "tagihan"   : 1000000,
      "flag"    : "F",
      "description" : "JALAN LEBAR DAUN WAY HITAM",
      "terbayar"    : 0,
      "createdate"  : 18112014,
      "createtime"  : 81218
  }
  ---------------------------------------------------------------------------

  - Import a HTML file and watch it magically convert to Markdown
  - Drag and drop images (requires your Dropbox account be linked)


You can also:
  - Import and save files from GitHub, Dropbox, Google Drive and One Drive
  - Drag and drop markdown and HTML files into Dillinger
  - Export documents as Markdown, HTML and PDF

Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.

### Tech

Dillinger uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Ace Editor] - awesome web-based text editor
* [markdown-it] - Markdown parser done right. Fast and easy to extend.
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system
* [Breakdance](http://breakdance.io) - HTML to Markdown converter
* [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd dillinger
$ npm install -d
$ node app
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node app
```

### Plugins

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| Github | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |


### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma test
```
#### Building for source
For production release:
```sh
$ gulp build --prod
```
Generating pre-built zip archives for distribution:
```sh
$ gulp build dist --prod
```
### Docker
Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
docker build -t joemccann/dillinger:${package.json.version} .
```
This will create the dillinger image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:${package.json.version}
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```

#### Kubernetes + Google Cloud

See [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)


### Todos

 - Write MORE Tests
 - Add Night Mode

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
