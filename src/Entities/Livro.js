class Livro {
  constructor(titulo, autor, genero, imagem) {
      this.titulo = titulo;
      this.autor = autor;
      this.genero = genero;
      this.imagem = imagem;
      this.exemplaresDisponiveis = 1; // Inicialmente, assumimos que há pelo menos um exemplar disponível
  }
}

module.exports = Livro;
