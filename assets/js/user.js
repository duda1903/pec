document.addEventListener("DOMContentLoaded", async () => {
    const estagiarioDados = document.getElementById("estagiario-dados");

    try {
        const token = localStorage.getItem("token"); // Supondo que o token está salvo no localStorage após login
        console.log(localStorage.getItem("token"));

        if (!token) {
            estagiarioDados.innerHTML = '<p>Erro: Usuário não autenticado.</p>';
            return;
        }

        const response = await fetch(`http://localhost:3000/api/perfil`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const estagiario = await response.json();

        if (estagiario) {
            estagiarioDados.innerHTML = `
                <div class="cardUser">
                    <div class="card-body">
                        <h5 class="card-title"><strong>${estagiario.nome}</strong></h5>
                        <p class="card-text"><strong>Cidade:</strong> ${estagiario.cidade}</p>
                        <p class="card-text"><strong>Habilidades:</strong> ${estagiario.habilidades}</p>
                        <p class="card-text"><strong>Formação Acadêmica:</strong> ${estagiario.formacaoAcademica}</p>
                        <p class="card-text"><strong>Telefone:</strong> ${estagiario.telefone}</p>
                        <p class="card-text"><strong>Email:</strong> ${estagiario.email}</p>
                        <p class="card-text"><strong>Links:</strong> ${estagiario.links}</p>
                    </div>
                </div>
            `;
        } else {
            estagiarioDados.innerHTML = '<p>Estagiário não encontrado.</p>';
        }
    } catch (error) {
        estagiarioDados.innerHTML = '<p>Erro ao carregar os dados do estagiário. Tente novamente mais tarde.</p>';
        console.error('Erro ao buscar estagiário:', error);
    }
});
