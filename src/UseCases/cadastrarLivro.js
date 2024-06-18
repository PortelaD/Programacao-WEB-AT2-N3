const fs = require('fs');
const path = require('path');

const livroFile = path.resolve(__dirname, '../utils/livros.json');

function cadastrarLivro(novoLivro) {
    return new Promise((resolve, reject) => {
        fs.readFile(livroFile, 'utf8', (err, data) => {
            if (err) {
                reject('Erro ao ler o arquivo de livros');
                return;
            }
            const livros = JSON.parse(data).books;
            novoLivro.id = String(livros.length + 1); // Simplesmente adiciona um ID sequencial
            livros.push(novoLivro);
            fs.writeFile(livroFile, JSON.stringify({ books: livros }, null, 2), err => {
                if (err) {
                    reject('Erro ao escrever no arquivo de livros');
                    return;
                }
                resolve('Livro cadastrado com sucesso');
            });
        });
    });
}

module.exports = cadastrarLivro;
