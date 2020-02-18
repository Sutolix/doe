//Configurando o servidor
const express = require("express")
const server = express()

//Configura para receber arquivos estáticos (css, imagens e afins)
server.use(express.static('public'))

//Habilitar body do formulário
server.use(express.urlencoded({ extended: true }))

//Configura a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true, //para não carregar cache durante a produção
})

//Lista de doadores: Array
const donors = [
    {
        name: "Diego Fernandes",
        blood: "AB+"
    },

    {
        name: "Cleiton Souza",
        blood: "B+"
    },

    {
        name: "Matheus Ferreira",
        blood: "A+"
    },

    {
        name: "Jaqueline Silva",
        blood: "O-"
    }
]

//Configura a apresentação da página
server.get("/", function(req, res){
    return res.render("index.html", { donors })
})

server.post("/", function(req, res){
    //pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //coloca valores dentro do array
    donors.push({
        name: name,
        blood: blood,
    })

    return res.redirect("/")
})

//Liga o servidor e permite seu acesso na porta 3000
server.listen(3333, function(){
    console.log("server started")
})
