/* Importa as dependências */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

/* Cria o servidor WEB */
const app = express();

// middlewares
app.use( bodyParser.json() );
app.use(cors());

/*Cria conexão com banco de dados */
const con = mysql.createConnection({
    host: 'sql10.freesqldatabase.com', // O host do banco. Ex: localhost
    user: 'sql10745009', // Um usuário do banco. Ex: user 
    password: '36g24xcCEY', // A senha do usuário. Ex: user123
    database: 'sql10745009', // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
    port: 3306
});

con.connect((err) => {
    if (err) {
        console.log('Erro connecting to database...', err)
        return
    }
    console.log('Connection established!')
})

/** Cria uma função do tipo POST para a rota '/api/login' */
app.post('/api/login', (req, res) =>{
    const {nome, senha} = req.body;
    con.query('SELECT * FROM login WHERE nome = ?', [nome], (err, rows) => {
        if (err) {
            console.error('Erro ao consultar o banco:', err);
            return res.status(500).json({ error: 'Erro no servidor' });
        }

        if (rows.length === 0 || senha !== rows[0].senha) {
            return res.status(401).json({ error: 'Usuário ou senha inválidos' });
        }

        // Verifica se o usuário é administrador (adm = 1)
        const usuario = rows[0];
        if (usuario.adm === 1) {
            return res.status(201).json({ message: 'Usuário administrador autenticado' });
        }

        // Usuário comum autenticado
        res.status(200).json({ message: 'Usuário autenticado com sucesso' });
    });
});

/** Inicia o servidor */
app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000!');
});