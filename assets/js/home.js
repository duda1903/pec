document.addEventListener("DOMContentLoaded", async () => {
    const vagasLista = document.getElementById("vagas-lista");

    try {
        const response = await fetch('http://localhost:3000/api/vagas');
        const vagas = await response.json();

        if (vagas.length > 0) {
            vagas.forEach(vaga => {
                const vagaCard = document.createElement('div');
                vagaCard.className = 'col-md-4 mb-2';
                vagaCard.innerHTML = `<div class="card">
                        <div class="card-body">
                            <i class="bi bi-star style="color: gold; font-size: 24px; margin-right: 10px;""></i>
                            <h4><strong>${vaga.nomeEmpresa}</strong></h4>
                            <h3 class="card-title">${vaga.titulo}</h5>
                            <p class="card-text">${vaga.descricao}</p>
                            <p><strong>Data de Publicação:</strong> ${new Date(vaga.dataPublicacao).toLocaleDateString()}</p>
                            <div class="vaga-detalhes" style="display: none;">
                                <p><strong>Requisitos:</strong> ${vaga.requisitos}</p>
                                <p><strong>Cidade:</strong> ${vaga.cidade}</p>
                                <p><strong>Email da Empresa:</strong> ${vaga.emailEmpresa}</p>
                                <p><strong>Telefone da Empresa:</strong> ${vaga.telEmpresa}</p>
                            </div>
                            <button class="btn btn-primary custom-button" onclick="toggleDetails(this)">Saiba mais</button>
                        </div>
                    </div>
                `;
                vagasLista.appendChild(vagaCard);
            });
        } else {
            vagasLista.innerHTML = '<p>Nenhuma vaga disponível no momento.</p>';
        }
    } catch (error) {
        vagasLista.innerHTML = '<p>Erro ao carregar as vagas. Tente novamente mais tarde.</p>';
        console.error('Erro ao buscar vagas:', error);
    }
});

function toggleDetails(button) {
    const card = button.closest('.card');
    const detailsDiv = button.previousElementSibling;
    if (detailsDiv.style.display === 'none' || detailsDiv.style.display === '') {
        detailsDiv.style.display = 'block';
        button.textContent = 'Saiba menos';
        card.classList.add('expanded');
    } else {
        detailsDiv.style.display = 'none';
        button.textContent = 'Saiba mais';
        card.classList.remove('expanded');
    }
}