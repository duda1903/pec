document.addEventListener("DOMContentLoaded", async () => {
    const estagiarioDados = document.getElementById("estagiario-dados");
    const idEstagiario = 3; // Substitua pelo id do estagiário que você deseja buscar

    try {
        const response = await fetch(`http://localhost:3000/api/estagiario/${idEstagiario}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const estagiario = await response.json();

        if (estagiario) {
            const estagiarioCard = document.createElement('div');
            estagiarioCard.className = 'col-md-0 mb-4';
            estagiarioCard.innerHTML = `
                <div class="cardUser">
                    <div class="card-body">
                        <h5 class="card-title"><strong>${estagiario.nome}</strong></h5>
                        <p class="card-text">Cidade: ${estagiario.cidade}</p>
                        <p class="card-text">Habilidades: ${estagiario.habilidades}</p>
                        <p class="card-text">Formação Acadêmica: ${estagiario.formacaoAcademica}</p>
                        <p class="card-text">Telefone: ${estagiario.telefone}</p>
                        <p class="card-text">Email: ${estagiario.email}</p>
                        <p class="card-text">Links: ${estagiario.links}</p>
                    </div>
                </div>
            `;
            estagiarioDados.appendChild(estagiarioCard); // Corrigido aqui para usar estagiarioDados
        } else {
            estagiarioDados.innerHTML = '<p>Estagiário não encontrado.</p>';
        }
    } catch (error) {
        estagiarioDados.innerHTML = '<p>Erro ao carregar os dados do estagiário. Tente novamente mais tarde.</p>';
        console.error('Erro ao buscar estagiário:', error);
    }
});
