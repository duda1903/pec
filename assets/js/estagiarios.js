document.addEventListener("DOMContentLoaded", function () {
    fetchEstagiarios();

    function fetchEstagiarios() {
        fetch('http://localhost:3000/api/estagiarios')
            .then(response => response.json())
            .then(estagiarios => {
                // Seleciona o elemento onde os dados serão exibidos
                const estagiarioContainer = document.getElementById('estagiario-dados');

                if (estagiarios.length === 0) {
                    estagiarioContainer.innerHTML = '<p>Nenhum estagiário encontrado.</p>';
                } else {
                    estagiarios.forEach(estagiario => {
                        // Cria um card para cada estagiário
                        const card = document.createElement('div');
                        card.className = 'col-md-3 mb-4';

                        // Conteúdo do card
                        card.innerHTML = `
                            <div class="card-body">
                                <h5 class="card-title">${estagiario.nome}</h5>
                                <p class="card-text"><strong>Cidade:</strong> ${estagiario.cidade}</p>
                                <p class="card-text"><strong>Habilidades:</strong> ${estagiario.habilidades}</p>
                                <p class="card-text"><strong>Formação Acadêmica:</strong> ${estagiario.formacaoAcademica}</p>
                                <p class="card-text"><strong>Contato:</strong> ${estagiario.telefone} | ${estagiario.email}</p>
                            </div>
                        `;

                        // Adiciona o card ao container de estagiários
                        estagiarioContainer.appendChild(card);
                    });
                }
            })
            .catch(error => {
                console.error('Erro ao buscar os estagiários:', error);
                const estagiarioContainer = document.getElementById('estagiario-dados');
                estagiarioContainer.innerHTML = '<p>Erro ao carregar os estagiários. Tente novamente mais tarde.</p>';
            });
    }
});
