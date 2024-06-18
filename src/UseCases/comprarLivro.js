const fs = require('fs');
const path = require('path');

const livroFile = path.resolve(__dirname, '../utils/livros.json');

function comprarLivro(titulo) {
    return new Promise((resolve, reject) => {
        fs.readFile(livroFile, 'utf8', (err, data) => {
            if (err) {
                reject('Erro ao ler o arquivo de livros');
                return;
            }
            const livros = JSON.parse(data).books;
            const livro = livros.find(l => l.titulo === titulo);
            if (!livro) {
                reject('Livro não encontrado');
                return;
            }
            if (livro.exemplaresDisponiveis === 0) {
                reject('Não há exemplares disponíveis para este livro');
                return;
            }
            livro.exemplaresDisponiveis--;
            fs.writeFile(livroFile, JSON.stringify({ books: livros }, null, 2), err => {
                if (err) {
                    reject('Erro ao escrever no arquivo de livros');
                    return;
                }
                resolve('Compra realizada com sucesso');
            });
        });
    });
}

module.exports = comprarLivro;
