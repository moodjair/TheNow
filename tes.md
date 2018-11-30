```sh
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
```