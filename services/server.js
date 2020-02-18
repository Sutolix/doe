//Configurando o servidor
const express = require("express")
const server = express()

//Configura para receber arquivos estáticos (css, imagens e afins)
server.use(express.static('public'))

//Habilitar body do formulário
server.use(express.urlencoded({ extended: true }))

//Configura a conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

//Configura a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true, //para não carregar cache durante a produção
})

//Configura a apresentação da página
server.get("/", function(req, res){
    
    db.query("SELECT * FROM donors ORDER BY id DESC", function(err, result){
        if (err) return res.send("Erro no banco de dados.")
        
        const donors = result.rows
        return res.render("index.html", { donors })
    })
})

server.post("/", function(req, res){
    //pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios!")
    }

    //coloca valores dentro do banco de dados
    const query = `INSERT INTO donors ("name", "email", "blood")
    VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function(err){
        //erro
        if (err) return res.send("erro no banco de dados.")
        //ok
        return res.redirect("/")
    })
})

//Liga o servidor e permite seu acesso na porta 3000
server.listen(3333, function(){
    console.log("server started")
})
