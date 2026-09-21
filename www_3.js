const http = require('http');
//moodul päringu parsimiseks ehk päringu lahtiharutamiseks
const url = require('url');
//moodul failitee haldamiseks
const path = require('path');
//moodul failide haldamiseks, lugemiseks, ASYNC puhul on vaja seda toetavad erilisemat moodulit, .promises
const fs = require('fs').promises;
//const fs = require('fs');

const dateET = require('./src/dateTimeET');

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Johanna Nomberg, veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Johanna Nomberg, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageBanner = '<img src="veebiprogrammeerimine_2026_TA.png" alt="">';
const pageFoot = '\n</body>\n</html>';
//n on uus rida

//lisasin async
http.createServer(async function(req, res){ //req on request, res on response
	//parsin url-i
	console.log('Päring: ' + req.url);
	let currentURL = url.parse(req.url, true);
	console.log('Parsituna: ' + currentURL.pathname);
	
	//hakkame erinevaid lehti jaotama -> routes (marsruudid)
	if(currentURL.pathname === '/'){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead); //res.write on console.log asemel
		res.write(pageBanner);
		res.write(pageBody);
		res.write('\t<p>Lehe avamise aeg: ' + dateET.fullDate(1) + ', kell ' + dateET.fullTime() + '</p>\n'); //(require peab ka olema!)
		res.write('\n\t<ul>\n\t\t<li><a href="/vanasona">Tänane vanasõna</a></li>');
		
		res.write(pageFoot);
		//res.write('Veeb läkski käima!');
		return res.end();
	}
	
	else if (currentURL.pathname === '/vanasona'){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead); //res.write on console.log asemel
		res.write(pageBanner);
		res.write('\t<h1>Eesti vanasõnad</h1>\n\t<p>Siin näed tänase päeva vanasõna.</p>\n\t<hr>');
		//lisada ühe vanasõna loosimise osa ka siia try ja catch osadega
		res.write('\n\t<ul>\n\t\t<li><a href="/">Tagasi avalehele</a></li>');
		res.write(pageFoot);
		return res.end();
	}
	
	else if(currentURL.pathname === '/veebiprogrammeerimine_2026_TA.png'){
		//teeme pildi tegeliku asukoha programmile kättesaadavaks
		let picPath = path.join(__dirname, 'pic', currentURL.pathname);
		//console.log(picPath);
		try {
			const data = await fs.readFile(picPath);
			res.writeHead(200, {"Content-type": "image/jpeg"}); //jpeg mitte jpg
			res.end(data);
		} catch (err){
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
			return res.end('Pilti ei leitud!');
		}
	} //hea on lisada sulu lõppu mis lõppes, näiteks siin lõppes else if pildi kättesaadavus
	
	else {
		res.end('Viga 404, ei leia sellist lehte!');
	}
}).listen(5111);