$(document).ready(function() {
    // Função para obter o token armazenado no localStorage ou cookies
    function getToken() {
        return localStorage.getItem('token'); // ou cookies, conforme sua implementação
    }

    // Função para carregar os dados do perfil
    function loadProfile() {
        const token = getToken();

        if (!token) {
            $('#profileContent').html('<p>Por favor, faça login para acessar seu perfil.</p>');
            return;
        }

        // Fazendo a requisição para a rota /perfil
        $.ajax({
            url: 'http://localhost:3000/api/perfil', // Substitua pelo endereço correto da sua API
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(data) {
                const user = data;

                // Garantir que os dados existam antes de usá-los
                const nome = user.nome || user.nomeEmpresa || 'Usuário';
                const cidade = user.cidade || 'N/A';
                const dataPublicacao = user.dataPublicacao || 'N/A';
                const modalidade = user.modalidade || 'N/A';
                const curso = user.curso || 'N/A';
                const email = user.email || 'N/A';

                let profileHtml = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Bem-vindo(a), ${nome}</h5>
                            <p class="card-text"><strong>Email:</strong> ${email}</p>
                            <p class="card-text"><strong>Cidade:</strong> ${cidade}</p>
                            <p class="card-text"><strong>Data de publicação:</strong> ${dataPublicacao}</p>
                            <p class="card-text"><strong>Modalidade:</strong> ${modalidade}</p>
                            <p class="card-text"><strong>Curso:</strong> ${curso}</p>
                        </div>
                    </div>
                `;
                $('#profileContent').html(profileHtml);
            },
            error: function(err) {
                // Mostrar uma mensagem de erro detalhada
                let errorMessage = 'Erro ao carregar os dados do perfil. Tente novamente mais tarde.';
                if (err.status === 401) {
                    errorMessage = 'Token expirado ou inválido. Por favor, faça login novamente.';
                } else if (err.status === 403) {
                    errorMessage = 'Token não fornecido.';
                }
                $('#profileContent').html('<p>' + errorMessage + '</p>');
                console.error(err);
            }
        });
    }

    // Carregar o perfil quando a página for carregada
    loadProfile();
});
