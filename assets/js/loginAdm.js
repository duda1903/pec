document.getElementById("formulario").addEventListener("submit", async (event) => {
  event.preventDefault(); // Previne o recarregamento da página

  // Captura dos valores de CPF e senha
  const cpf = document.getElementById("cpf").value;
  const senha = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/api/administracao/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cpf, senha })
    });

    const data = await response.json();

    if (response.ok) {

      localStorage.setItem("token", data.token);
      localStorage.setItem('token', data.token);
      // Redirecionar para a página da administração
      window.location.href = "../html/addVaga.html";
    } else {
      document.getElementById("mensagem").innerText = data.error || "Erro ao realizar login";
    }
  } catch (error) {
    console.error("Erro:", error);
    document.getElementById("mensagem").innerText = "Erro ao conectar com o servidor";
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