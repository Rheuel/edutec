/* Importa as dependências */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

/* Cria o servidor WEB */
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cors());

/* Cria conexão com banco de dados */
const con = mysql.createConnection({
    host: 'sql10.freesqldatabase.com', // O host do banco
    user: 'sql10745009',              // Usuário do banco
    password: '36g24xcCEY',           // Senha do usuário
    database: 'sql10745009',          // Base de dados
    port: 3306                        // Porta padrão do MySQL
});

con.connect((err) => {
    if (err) {
        console.log('Erro ao conectar no banco de dados:', err);
        return;
    }
    console.log('Conexão estabelecida com o banco de dados!');
});

/* Define rota para salvar email e senha na tabela 'login' */
app.post('/api/cadastro', (req, res) => {
    const { nome, senha } = req.body; // Obtém email e senha do corpo da requisição

    if (!nome || !senha) {
        res.status(400).send('Email e senha são obrigatórios');
        return;
    }

    // Query para inserir os dados na tabela "login"
    con.query('INSERT INTO login (nome, senha) VALUES (?, ?)', [nome, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados no banco:', err);
            res.status(500).send('Erro no servidor');
            return;
        }

        res.status(201).send('Usuário cadastrado com sucesso na tabela login!');
    });
});

/* Inicia o servidor */
app.listen(5000, () => {
    console.log('Servidor em execução na porta 5000!');
});