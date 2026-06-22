const form = document.getElementById('login-form');
const mensagem = document.getElementById('mensagem');
const logoutBtn = document.getElementById('logout-btn');
const API_URL = '/api';

function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.className = 'mensagem ' + (erro ? 'erro' : 'sucesso');
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const usuario = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value.trim();

  console.log("Teste");

  /*
  try {
    const resposta = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ usuario, senha })
    });

    let data;
    const contentType = resposta.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await resposta.json();
    } else {
      const texto = await resposta.text();
      data = { mensagem: texto, erro: texto };
    }

    if (resposta.ok) {
      mostrarMensagem(data.mensagem || 'Login realizado com sucesso', false);
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1000);
    } else {
      mostrarMensagem(data.erro || 'Falha no login', true);
    }
  } catch (err) {
    console.error(err);
    mostrarMensagem('Erro ao conectar ao servidor', true);
  }
  */
});

logoutBtn.addEventListener('click', async () => {
  const resposta = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  });

  const data = await resposta.json();
  mostrarMensagem(data.mensagem || data.erro, !resposta.ok);
});

