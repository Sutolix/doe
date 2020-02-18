//Configurando o servidor
const express = require("express")
const server = express()

//Configura para receber arquivos estáticos (css, imagens e afins)
server.use(express.static('public'))

//Configura a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server
})

//Configura a apresentação da página
server.get("/", function(req, res){
    return res.render("index.html")
})

//Liga o servidor e permite seu acesso na porta 3000
server.listen(3333, function(){
    console.log("server started")
})
