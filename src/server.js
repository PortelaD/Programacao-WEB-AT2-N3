const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const livrosRoutes = require('./routes/livroRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', livrosRoutes);

// Conectar ao banco de dados SQLite e criar a tabela se não existir
const db = new sqlite3.Database('./src/db/livros.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite');
        // Cria a tabela se não existir
        db.run(`CREATE TABLE IF NOT EXISTS livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            autor TEXT,
            genero TEXT,
            exemplaresDisponiveis INTEGER,
            imagemCapa TEXT
        )`, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela:', err.message);
            } else {
                console.log('Tabela "livros" criada com sucesso');
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
