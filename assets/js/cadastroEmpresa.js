document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-cad');
    const mensagemErro = document.getElementById('mensagemErro');

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previne o reload da página ao submeter o formulário

        // Coleta os valores dos campos do formulário
        const nomeEmpresa = document.getElementById('username').value;
        const emailEmpresa = document.getElementById('email').value;
        const telEmpresa = document.getElementById('telefone').value;
        const cidade = document.getElementById('cidade').value;
        const descricao = document.getElementById('descricao').value;
        const cnpj = document.getElementById('cnpj').value;
        const senha = document.getElementById('senha').value;

        // Cria o objeto com os dados da empresa
        const empresa = {
            nomeEmpresa,
            emailEmpresa,
            telEmpresa,
            cidade,
            descricao,
            cnpj,
            senha
        };

        try {
            // Envia a requisição para a rota de cadastro
            const response = await fetch('http://localhost:3000/api//empresas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(empresa)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                formulario.reset(); 
                window.location.href = "../html/estagiarios.html";
            } else {
                // Exibe a mensagem de erro
                mensagemErro.textContent = data.error || 'Erro ao cadastrar a empresa.';
            }
        } catch (error) {
            mensagemErro.textContent = 'Erro ao conectar com o servidor. Tente novamente.';
            console.error('Erro:', error);
        }
    });
});
