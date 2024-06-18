const fs = require('fs');
const path = require('path');

const livroFile = path.resolve(__dirname, '../utils/livros.json');

function listarLivros() {
    return new Promise((resolve, reject) => {
        fs.readFile(livroFile, 'utf8', (err, data) => {
            if (err) {
                reject('Erro ao ler o arquivo de livros');
                return;
            }
            const livros = JSON.parse(data).books;
            resolve(livros);
        });
    });
}

module.exports = listarLivros;
