const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/db/livros.db');

// Listagem dos livros
exports.listarLivros = (req, res) => {
    const query = 'SELECT * FROM livros';
    db.all(query, (err, livros) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(livros);
    });
};

// Compra de um livro
exports.comprarLivro = (req, res) => {
    const { titulo } = req.body;
    const query = 'UPDATE livros SET exemplaresDisponiveis = exemplaresDisponiveis - 1 WHERE titulo = ?';
    db.run(query, [titulo], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: `Compra do livro ${titulo} realizada com sucesso` });
    });
};

// Adição de exemplares de um livro
exports.adicionarExemplares = (req, res) => {
    const { titulo, quantidade } = req.body;
    const query = 'UPDATE livros SET exemplaresDisponiveis = exemplaresDisponiveis + ? WHERE titulo = ?';
    db.run(query, [quantidade, titulo], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: `Adicionados ${quantidade} exemplares do livro ${titulo}` });
    });
};

// Cadastro de novo livro
exports.cadastrarLivro = (req, res) => {
    const { titulo, autor, genero, exemplaresDisponiveis, imagemCapa } = req.body;
    const query = 'INSERT INTO livros (titulo, autor, genero, exemplaresDisponiveis, imagemCapa) VALUES (?, ?, ?, ?, ?)';
    const values = [titulo, autor, genero, exemplaresDisponiveis, imagemCapa];
    db.run(query, values, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: `Livro ${titulo} cadastrado com sucesso` });
    });
};

// Busca de livro por nome
exports.buscarLivroPorNome = (req, res) => {
    const { nome } = req.params;
    const query = 'SELECT * FROM livros WHERE titulo LIKE ?';
    db.all(query, [`%${nome}%`], (err, livros) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(livros);
    });
};

// Edição das informações de um livro
exports.editarLivro = (req, res) => {
    const { id } = req.params;
    const { titulo, autor, genero, exemplaresDisponiveis, imagemCapa } = req.body;
    const query = 'UPDATE livros SET titulo = ?, autor = ?, genero = ?, exemplaresDisponiveis = ?, imagemCapa = ? WHERE id = ?';
    const values = [titulo, autor, genero, exemplaresDisponiveis, imagemCapa, id];
    db.run(query, values, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: `Livro com ID ${id} atualizado com sucesso` });
    });
};

// Remoção de um livro
exports.removerLivro = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM livros WHERE id = ?';
    db.run(query, [id], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: `Livro com ID ${id} removido do acervo` });
    });
};
