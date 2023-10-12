const fs= require("fs");
const http=require("http");
const url = require("url");

const utenti = [
    {
        user: "Simone",
        password: "Siepi"
    },
    {
        user: "winstalla23",
        password: "123"
    },

    {
        user: "pippo",
        password: "paperino"
    }
];


function requestHandler(request,response){
    let oggettoUrl=url.parse(request.url, "true");
    console.log("href"+oggettoUrl.href);//fa visuliazzare il nome completo
    const path=oggettoUrl.pathname;//serve per ottenere il nome completo della pagina richiesta
    console.log("pathname:"+path);
    switch (path) {
        case "/":
            fs.readFile("index.html",function(error,data){
                if (error) {
                    response.writeHead(404);
                }else{
                    response.writeHead(200,{"content-Type":"text/html"});
                    response.write(data,"utf8");
                }
                response.end();
            });
            break;

            case "/css/Style.css":
                fs.readFile("css/Style.css",function(error,data){
                    if (error) {
                        response.writeHead(404);
                    }else{
                        response.writeHead(200,{"content-Type":"text/css"});
                        response.write(data,"utf8");
                    }
                    response.end();
                });
                break;

        case "/html/recuperaDati.html":
            const query=oggettoUrl.query;
            const nome=oggettoUrl.query.nome;
            const pass=oggettoUrl.query.pass;
            console.log(query);
            console.log(nome);
            console.log(pass);
            const trovaUtente=utenti.find(utente=> utente.user == nome && utente.password == pass)//*utilizzo find insime a una fuznione di callback anonima 
            if (trovaUtente) {                                                                    //*per comparare le singole proprieta dell'array di oggetti utenti
                response.writeHead(200,{"content-Type":"text/plain"});
                response.write("accesso riuscito/a:"+nome+"\n");
                response.end('dati ricevuti');
            }
            else{
                response.writeHead(401,{"content-Type":"text/plain"});//*401 significa che il client non dispone delle autorizazione necessarie per accedere hai contenuti
                response.write("accesso non riuscito\n");
                response.end('dati non corretti ricevuti');
            }
            break;
            
        default:
            response.writeHead(404, { "content-Type": "text/plain" });
            response.end("Pagina non trovata");
            break;
    }
}

const server=http.createServer(requestHandler);
server.listen(3000);
