document.getElementById('formulario-cad').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const nome = document.getElementById('username').value;
    const cidade = document.getElementById('cidade').value; 
    const habilidades = document.getElementById('habilidades').value;
    const curso = document.getElementById('curso').value; 
    const formacaoAcademica = document.getElementById('formacao').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const links = document.getElementById('link').value;
    const senha = document.getElementById('senha').value;
  
    const data = { nome, cidade, habilidades, curso, formacaoAcademica, telefone, email, links, senha };
  
    try {
      const response = await fetch('http://localhost:3000/api/estagiario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        window.location.href = '../html/home.html';
      } else {
        const result = await response.json();
        document.getElementById('mensagemErro').style.color = 'red';
        document.getElementById('mensagemErro').textContent = result.error || 'Erro ao cadastrar estagiário.';
      }
    } catch (error) {
      document.getElementById('mensagemErro').style.color = 'red';
      document.getElementById('mensagemErro').textContent = 'Erro ao conectar-se com o servidor.';
    }
  });
