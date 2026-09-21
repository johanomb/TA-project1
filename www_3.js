const http = require('http');
const dateET = require('./src/dateTimeET');

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Johanna Nomberg, veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Johanna Nomberg, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';
//n on uus rida

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageHead); //res.write on console.log asemel
	res.write(pageBody);
	res.write('\t<p>Lehe avamise aeg: ' + dateET.fullDate(1) + ', kell ' + dateET.fullTime() + '</p>\n'); //(require peab ka olema!)
	
	res.write(pageFoot);
	//res.write('Veeb läkski käima!');
	return res.end();
}).listen(5111);