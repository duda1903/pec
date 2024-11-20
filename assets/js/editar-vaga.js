document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idVaga = urlParams.get('idVaga');

    if (idVaga) {
        try {
            const response = await fetch(`https://apitcc.fly.dev/api/vagas/${idVaga}`);
            const vaga = await response.json();

            if (vaga) {
                document.getElementById('titulo').value = vaga.titulo;
                document.getElementById('descricao').value = vaga.descricao;
                document.getElementById('requisitos').value = vaga.requisitos;
                document.getElementById('cidade').value = vaga.cidade;
                document.getElementById('emailEmpresa').value = vaga.emailEmpresa;
                document.getElementById('telEmpresa').value = vaga.telEmpresa;
            } else {
                alert('Vaga não encontrada');
            }
        } catch (error) {
            alert('Erro ao carregar os dados da vaga');
            console.error(error);
        }
    }
});

document.getElementById('edit-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const idVaga = urlParams.get('idVaga');
    const formData = new FormData(event.target);
    
    const data = {
        titulo: formData.get('titulo'),
        descricao: formData.get('descricao'),
        requisitos: formData.get('requisitos'),
        cidade: formData.get('cidade'),
        emailEmpresa: formData.get('emailEmpresa'),
        telEmpresa: formData.get('telEmpresa'),
        // Adicione os outros campos necessários
    };

    try {
        const response = await fetch(`https://apitcc.fly.dev/api/vagas/${idVaga}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.status === 200) {
            alert('Vaga atualizada com sucesso!');
            window.location.href = '../adm/home.html'; // Redireciona para a página inicial ou lista de vagas
        } else {
            alert(result.error || 'Erro ao atualizar a vaga');
        }
    } catch (error) {
        alert('Erro ao atualizar a vaga. Tente novamente mais tarde.');
        console.error('Erro ao atualizar a vaga:', error);
    }
});

// Função de cancelamento
function cancelEdit() {
    window.location.href = '/html/adm/home.html'; // Redireciona de volta para a página home.html
}