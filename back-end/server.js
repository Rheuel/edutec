require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');


const app = express();
app.use(express.static(path.join(__dirname, '../front-end')));

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end', 'index.html')); 
});

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT                       
});

con.connect((err) => {
    if (err) {
        console.log('Erro ao conectar no banco de dados:', err);
        return;
    }
    console.log('Conexão estabelecida com o banco de dados!');
});

app.post('/api/cadastro', (req, res) => {
    const { nome, senha } = req.body; 

    if (!nome || !senha) {
        res.status(400).send('Email e senha são obrigatórios');
        return;
    }


    con.query('INSERT INTO login (nome, senha) VALUES (?, ?)', [nome, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados no banco:', err);
            res.status(500).send('Erro no servidor');
            return;
        }

        res.status(201).send('Usuário cadastrado com sucesso na tabela login!');
    });
});

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

       
        const usuario = rows[0];
        if (usuario.adm === 1) {
            return res.status(201).json({ message: 'Usuário administrador autenticado', id: usuario.id });
        }

       
        res.status(200).json({ message: 'Usuário autenticado com sucesso', id: usuario.id });
    });
});

app.get('/api/ranking', (req, res) => {
    const query = 'SELECT login.nome, ranking.pontos FROM login INNER JOIN ranking ON login.id = ranking.login_id ORDER BY ranking.pontos DESC';
    con.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar ranking:', err);
            res.status(500).send('Erro no servidor');
            return;
        }
        res.status(200).json(results);  
    });
});

app.post('/api/updatePoints', (req, res) => {
    const { id, pontos } = req.body;

    if (!id || pontos === undefined) {
        return res.status(400).json({ message: 'ID e pontos são obrigatórios.' });
    }

    const updateQuery = 'UPDATE ranking SET pontos = ? WHERE id = ?';
    con.query(updateQuery, [pontos, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar pontos:', err);
            return res.status(500).json({ message: 'Erro ao atualizar pontos.' });
        }

        if (result.affectedRows > 0) {
            return res.json({ message: 'Pontos atualizados com sucesso!' });
        } else {
            const insertQuery = 'INSERT INTO ranking (id, pontos) VALUES (?, ?)';
            con.query(insertQuery, [id, pontos], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error('Erro ao inserir novo usuário:', insertErr);
                    return res.status(500).json({ message: 'Erro ao inserir novo usuário.' });
                }

                return res.json({ message: 'Novo usuário criado e pontos inseridos com sucesso!' });
            });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});