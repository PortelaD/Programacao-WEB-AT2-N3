document.addEventListener('DOMContentLoaded', () => {
    const listaLivros = document.getElementById('livros-lista');
    const modalEditarLivro = new bootstrap.Modal(document.getElementById('modalEditarLivro'));

    // Função para carregar a lista de livros
    const carregarLivros = async () => {
        listaLivros.innerHTML = ''; // Limpa a lista antes de carregar novamente
        try {
            const response = await fetch('/api/livros');
            if (!response.ok) {
                throw new Error('Erro ao carregar os livros');
            }
            const livros = await response.json();
            livros.forEach(livro => {
                const itemLivro = document.createElement('li');
                itemLivro.innerHTML = `
                    <img src="${livro.imagemCapa}" alt="Capa do Livro">
                    <div>
                        <h3>${livro.titulo}</h3>
                        <p><strong>Autor:</strong> ${livro.autor}</p>
                        <p><strong>Gênero:</strong> ${livro.genero}</p>
                        <p><strong>Exemplares Disponíveis:</strong> ${livro.exemplaresDisponiveis}</p>
                        <button class="editar-livro btn btn-primary" data-id="${livro.id}">Editar</button>
                        <button class="excluir-livro btn btn-danger" data-id="${livro.id}">Excluir</button>
                    </div>
                `;
                listaLivros.appendChild(itemLivro);
            });

            // Adicionar listener para o botão de editar livro
            listaLivros.addEventListener('click', (event) => {
                if (event.target.classList.contains('editar-livro')) {
                    const livroId = event.target.getAttribute('data-id');
                    const livro = livros.find(l => l.id == livroId);
                    document.getElementById('livroId').value = livroId;
                    document.getElementById('novoTitulo').value = livro.titulo;
                    document.getElementById('novoAutor').value = livro.autor;
                    document.getElementById('novoGenero').value = livro.genero;
                    document.getElementById('novosExemplares').value = livro.exemplaresDisponiveis;
                    document.getElementById('novaImagem').value = livro.imagemCapa;
                    modalEditarLivro.show();
                } else if (event.target.classList.contains('excluir-livro')) {
                    const livroId = event.target.getAttribute('data-id');
                    if (confirm('Tem certeza que deseja excluir este livro?')) {
                        excluirLivro(livroId);
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao carregar os livros:', error.message);
        }
    };

    // Função para excluir um livro
    const excluirLivro = async (livroId) => {
        try {
            const response = await fetch(`/api/remover-livro/${livroId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir o livro');
            }
            alert('Livro excluído com sucesso');
            carregarLivros(); // Recarrega a lista após excluir
        } catch (error) {
            console.error('Erro ao excluir o livro:', error.message);
        }
    };

    // Chamar a função para carregar os livros ao carregar a página
    carregarLivros();

    // Capturar o submit do formulário de cadastro
    const formCadastro = document.getElementById('form-cadastro');
    formCadastro.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formCadastro);
        const novoLivro = {
            titulo: formData.get('titulo'),
            autor: formData.get('autor'),
            genero: formData.get('genero'),
            exemplaresDisponiveis: parseInt(formData.get('exemplares')),
            imagemCapa: formData.get('imagem')
        };
        try {
            const response = await fetch('/api/cadastrar-livro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoLivro)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar o livro');
            }
            alert('Livro cadastrado com sucesso');
            formCadastro.reset(); // Limpa o formulário após cadastrar
            carregarLivros(); // Recarrega a lista após cadastrar
        } catch (error) {
            console.error('Erro ao cadastrar o livro:', error.message);
        }
    });

    // Capturar o submit do formulário de edição de livro
    const formEditarLivro = document.getElementById('formEditarLivro');
    formEditarLivro.addEventListener('submit', async (event) => {
        event.preventDefault();
        const livroId = document.getElementById('livroId').value;
        const novoTitulo = document.getElementById('novoTitulo').value;
        const novoAutor = document.getElementById('novoAutor').value;
        const novoGenero = document.getElementById('novoGenero').value;
        const novosExemplares = parseInt(document.getElementById('novosExemplares').value);
        const novaImagem = document.getElementById('novaImagem').value;
        
        const livroEditado = {
            titulo: novoTitulo,
            autor: novoAutor,
            genero: novoGenero,
            exemplaresDisponiveis: novosExemplares,
            imagemCapa: novaImagem
        };

        try {
            const response = await fetch(`/api/editar-livro/${livroId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(livroEditado)
            });
            if (!response.ok) {
                throw new Error('Erro ao editar o livro');
            }
            alert('Livro editado com sucesso');
            modalEditarLivro.hide(); // Fecha o modal após editar
            carregarLivros(); // Recarrega a lista após editar
        } catch (error) {
            console.error('Erro ao editar o livro:', error.message);
        }
    });
});
