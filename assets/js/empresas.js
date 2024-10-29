document.addEventListener('DOMContentLoaded', () => {
    const empresasContainer = document.getElementById('empresas-dados');

    // Função para buscar as empresas da API
    const carregarEmpresas = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/empresas');
            if (!response.ok) {
                throw new Error('Erro ao buscar as empresas');
            }
            const empresas = await response.json();

            // Exibindo os dados das empresas na página
            empresas.forEach(empresa => {
                const empresaCard = document.createElement('div');
                empresaCard.className = 'col-12 mb-4 d-flex justify-content-center';
                empresaCard.innerHTML = `
                    <div class="cardEmpresa card h-100">
                        <div class="card-body">
                            <h5 class="card-title"><strong>${empresa.nomeEmpresa}</strong></h5>
                            <p class="card-text"><strong>Curso:</strong> ${empresa.curso}</p>
                            <p class="card-text"><strong>Email:</strong> ${empresa.emailEmpresa}</p>
                            <p class="card-text"><strong>Telefone:</strong> ${empresa.telEmpresa}</p>
                            <p class="card-text"><strong>Cidade:</strong> ${empresa.cidade}</
                        </div>
                    </div>
                `;
                empresasContainer.appendChild(empresaCard);
            });
        } catch (error) {
            console.error('Erro:', error);
            empresasContainer.innerHTML = '<p>Erro ao carregar as empresas.</p>';
        }
    };

    // Carrega os dados das empresas ao iniciar a página
    carregarEmpresas();
});
