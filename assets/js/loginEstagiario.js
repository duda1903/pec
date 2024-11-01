document.getElementById('formulario').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const mensagemElement = document.getElementById('mensagem');

    try {
        const response = await fetch('http://localhost:3000/api/estagiario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        if (response.ok) {
            const data = await response.json();
            mensagemElement.style.color = 'green';
            mensagemElement.textContent = 'Login realizado com sucesso!';

            window.location.href = '../html/home.html';
        } else {
            const errorData = await response.json();
            mensagemElement.style.color = 'red';S
            mensagemElement.textContent = errorData.message;
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        mensagemElement.style.color = 'red';
        mensagemElement.textContent = 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.';
    }
});


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

