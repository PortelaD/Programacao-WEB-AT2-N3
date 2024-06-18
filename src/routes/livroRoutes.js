const express = require('express');
const router = express.Router();
const livrosController = require('../Controllers/livrosController');

// Listagem dos livros
router.get('/livros', livrosController.listarLivros);

// Compra de um livro
router.post('/comprar', livrosController.comprarLivro);

// Adição de exemplares de um livro
router.post('/adicionar-exemplares', livrosController.adicionarExemplares);

// Cadastro de novo livro
router.post('/cadastrar-livro', livrosController.cadastrarLivro);

// Busca de livro por nome
router.get('/buscar-livro/:nome', livrosController.buscarLivroPorNome);

// Edição das informações de um livro
router.put('/editar-livro/:id', livrosController.editarLivro);

// Remoção de um livro
router.delete('/remover-livro/:id', livrosController.removerLivro);

module.exports = router;
