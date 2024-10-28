document.getElementById('vagaForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        requisitos: document.getElementById('requisitos').value,
        cidade: document.getElementById('cidade').value,
        dataPublicacao: document.getElementById('dataPublicacao').value,
        administracao_idAdm: document.getElementById('administracao_idAdm').value,
        nomeEmpresa: document.getElementById('nomeEmpresa').value,
        emailEmpresa: document.getElementById('emailEmpresa').value,
        telEmpresa: document.getElementById('telEmpresa').value,
        modalidade: document.getElementById('modalidade').value,
        curso: document.getElementById('curso').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/vagas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('message').innerText = data.message;
            document.getElementById('vagaForm').reset(); // Limpa o formulário
        } else {
            document.getElementById('message').innerText = `Erro: ${data.error}`;
        }
    } catch (error) {
        document.getElementById('message').innerText = `Erro: ${error.message}`;
    }
});
