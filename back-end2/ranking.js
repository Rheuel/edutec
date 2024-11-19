// Importando as dependências
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// Criando o servidor
const app = express();

// Configurando middlewares
app.use(bodyParser.json()); // Para parsear o corpo da requisição como JSON
app.use(cors());            // Para permitir requisições de diferentes origens

// Conectando ao banco de dados
const con = mysql.createConnection({
    host: 'sql10.freesqldatabase.com',  // Substitua com o host do seu banco
    user: 'sql10745009',                // Substitua com seu nome de usuário
    password: '36g24xcCEY',             // Substitua com sua senha
    database: 'sql10745009',            // Substitua com o nome do seu banco
    port: 3306                          // Porta padrão do MySQL
});

// Estabelecendo a conexão
con.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no banco de dados:', err);
        return;
    }
    console.log('Conexão estabelecida com o banco de dados!');
});

// Rota para obter o ranking
app.get('/api/ranking', (req, res) => {
    const query = 'SELECT nome, pontos FROM login ORDER BY pontos DESC';
    con.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar ranking:', err);
            res.status(500).send('Erro no servidor');
            return;
        }
        res.status(200).json(results);  // Retorna os resultados em formato JSON
    });
});

// Rota para adicionar um novo usuário no ranking
app.post('/api/ranking', (req, res) => {
    const { nome, pontos } = req.body;
    if (!nome || pontos === undefined) {
        return res.status(400).send('Nome e pontuação são obrigatórios');
    }

    const query = 'INSERT INTO login (nome, pontos) VALUES (?, ?)';
    con.query(query, [nome, pontos], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no ranking:', err);
            return res.status(500).send('Erro no servidor');
        }
        res.status(201).send('Usuário inserido com sucesso!');
    });
});

// Inicia o servidor
app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});