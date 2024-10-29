document.getElementById('formulario').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Captura os valores do formulário
    const cnpj = document.getElementById('cnpj').value;
    const senha = document.getElementById('password').value;

    // Seleciona o elemento de mensagem
    const mensagemElement = document.getElementById('mensagem');

    try {
        // Faz a requisição POST para a rota de login
        const response = await fetch('http://localhost:3000/api/empresas/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({cnpj, senha }),
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            const data = await response.json();
            mensagemElement.style.color = 'green';
            mensagemElement.textContent = 'Login realizado com sucesso!';

                window.location.href = '../html/estagiarios.html';
        } else {
            const errorData = await response.json();
            mensagemElement.style.color = 'red';
            mensagemElement.textContent = errorData.message; // Exibe a mensagem de erro
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        mensagemElement.style.color = 'red';
        mensagemElement.textContent = 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.';
    }
});

function togglePassword() { 
    const senhaInput = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePassword');

    if (senhaInput.type === 'password') {
        senhaInput.type = 'text'; 
        toggleIcon.classList.remove('fa-eye-slash'); 
        toggleIcon.classList.add('fa-eye'); 
    } else {
        senhaInput.type = 'password'; 
        toggleIcon.classList.remove('fa-eye'); 
        toggleIcon.classList.add('fa-eye-slash'); 
    }
}
