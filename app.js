const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var port = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'views')));
// View engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.post('/mail', function (req, res) {
    console.log(req.body);
    let transport = nodemailer.createTransport({
        host: req.body.msaddress,
        port: req.body.pnumber,
        auth: {
           user: req.body.Uname,
           pass: req.body.Pword
        }
    });
    const message = {
        from: req.body.smaddress,
        to: req.body.rmaddress,
        subject: req.body.subject,
        text: req.body.msg
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err);
          const ar = "Failed"
          res.render(path.join(__dirname+'/views/index.html'),{myArray:ar});
        } else {
          console.log(info);
          const ar = "Success"
          res.render(path.join(__dirname+'/views/index.html'),{myArray:ar});
        }
    });
});

//add the router
app.use('/', router);
var server=app.listen(port,function() {
  console.log("app running on port 8080"); });
// app.listen(process.env.port || 5000);
