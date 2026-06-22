const form = document.getElementById('usuario-form');
const idInput = document.getElementById('usuario-id');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const tabela = document.getElementById('usuarios-tabela');
const mensagem = document.getElementById('mensagem');
const cancelarEdicaoBtn = document.getElementById('cancelar-edicao');

const API_URL = '/api/usuarios';

function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.style.color = erro ? '#b42318' : '#0b5b55';
}

function limparFormulario() {
  idInput.value = '';
  nomeInput.value = '';
  emailInput.value = '';
}

async function carregarUsuarios() {
  try {
    const resposta = await fetch(API_URL, { credentials: 'include' });
    if (!resposta.ok) throw new Error('Falha ao carregar usuarios');
    const usuarios = await resposta.json();

    tabela.innerHTML = '';

    usuarios.forEach((usuario) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>
          <button class="acao" data-editar="${usuario.id}">Editar</button>
          <button class="acao btn-excluir" data-excluir="${usuario.id}">Excluir</button>
        </td>
      `;

      tabela.appendChild(tr);
    });
  } catch (err) {
    mostrarMensagem('Erro ao carregar usuarios: ' + err.message, true);
  }
}

async function salvarUsuario(event) {
  event.preventDefault();

  const id = idInput.value;
  const payload = {
    nome: nomeInput.value.trim(),
    email: emailInput.value.trim()
  };

  const metodo = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    const resposta = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    if (!resposta.ok) {
      let erroMsg = 'Falha ao salvar usuario';
      try {
        const erroData = await resposta.json();
        erroMsg = erroData.erro || erroMsg;
      } catch (e) {
        // Se não for JSON, tenta pegar como texto
        const texto = await resposta.text();
        erroMsg = texto || erroMsg;
      }
      mostrarMensagem(erroMsg, true);
      return;
    }

    mostrarMensagem(id ? 'Usuario atualizado com sucesso' : 'Usuario criado com sucesso');
    limparFormulario();
    carregarUsuarios();
  } catch (err) {
    mostrarMensagem('Erro ao conectar ao servidor', true);
  }
}

async function excluirUsuario(id) {
  const confirmar = window.confirm('Deseja excluir este usuario?');

  if (!confirmar) {
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!resposta.ok) {
      let erroMsg = 'Falha ao excluir usuario';
      try {
        const erroData = await resposta.json();
        erroMsg = erroData.erro || erroMsg;
      } catch (e) {
        const texto = await resposta.text();
        erroMsg = texto || erroMsg;
      }
      mostrarMensagem(erroMsg, true);
      return;
    }

    mostrarMensagem('Usuario excluido com sucesso');
    carregarUsuarios();
  } catch (err) {
    mostrarMensagem('Erro ao conectar ao servidor', true);
  }
}

async function editarUsuario(id) {
  try {
    const resposta = await fetch(`${API_URL}/${id}`, { credentials: 'include' });
    if (!resposta.ok) throw new Error('Falha ao buscar usuario');
    const usuario = await resposta.json();

    idInput.value = usuario.id;
    nomeInput.value = usuario.nome;
    emailInput.value = usuario.email;
  } catch (err) {
    mostrarMensagem('Erro ao editar usuario', true);
  }
}

//form.addEventListener('submit', salvarUsuario);

cancelarEdicaoBtn.addEventListener('click', () => {
  limparFormulario();
  mostrarMensagem('Edicao cancelada');
});

tabela.addEventListener('click', (event) => {
  const editarId = event.target.getAttribute('data-editar');
  const excluirId = event.target.getAttribute('data-excluir');

  if (editarId) {
    editarUsuario(editarId);
  }

  if (excluirId) {
    excluirUsuario(excluirId);
  }
});

carregarUsuarios();
