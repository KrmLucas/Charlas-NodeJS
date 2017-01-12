
var querystring = require('querystring');
var nodemailer = require('nodemailer');


var smtpTransport = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

exports.postData = function (req, res) {
    var info = '';
    
    req.on('data', function(datosparciales){ 
         info += datosparciales;
    });
    req.on('end', function(){
        var formulario = querystring.parse(info);

        smtpTransport.sendMail({
        from: formulario['email'], // sender address
        to: "correo@dominio.com.ar", // comma separated list of receivers
        subject: formulario['subject'], // Subject line
        text: formulario['message'] // plaintext body
        }, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        });
    });
    return ;
}


