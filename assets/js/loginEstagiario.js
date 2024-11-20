document.getElementById('formulario').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagemElement = document.getElementById('mensagem');

    try {
        // Envia a requisição para o backend para autenticação
        const response = await fetch('https://apitcc.fly.dev/api/estagiario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        if (response.ok) {
            // Login bem-sucedido, salva o token no localStorage
            const data = await response.json();
            localStorage.setItem('token', data.token); // Salva o token no localStorage

            mensagemElement.style.color = 'green';
            mensagemElement.textContent = 'Login realizado com sucesso!';
            console.log(window.location.href); // Antes de redirecionar
            window.location.href = '/assets/html/estagiario/empresasEstagiario.html';


        } else {
            // Exibe a mensagem de erro
            const errorData = await response.json();
            mensagemElement.style.color = 'red';
            mensagemElement.textContent = errorData.message;
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        mensagemElement.style.color = 'red';
        mensagemElement.textContent = 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.';
    }
});

// Função para alternar a visibilidade da senha
function togglePassword() { 
    const senhaInput = document.getElementById('senha');
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