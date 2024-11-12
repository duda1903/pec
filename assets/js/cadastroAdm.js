document.getElementById('adminForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;
  
    try {
      const response = await fetch('http://localhost:3000/api/administracao/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nome, cpf, senha })
      });
  
      const data = await response.json();
      const responseMessage = document.getElementById('responseMessage');
  
      if (response.ok) {
        responseMessage.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
        window.location.href = "../html/addVaga.html"
      } else {
        responseMessage.innerHTML = `<div class="alert alert-danger">Erro: ${data.error}</div>`;
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      document.getElementById('responseMessage').innerHTML = `<div class="alert alert-danger">Erro na requisição: ${error.message}</div>`;
    }
  });
  