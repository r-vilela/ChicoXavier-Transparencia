const db = require('../db');

async function listar() {
  const result = await db.query('SELECT id, nome, email FROM usuarios ORDER BY id DESC');
  return result.rows;
}

async function buscarPorId(id) {
  const result = await db.query(
    'SELECT id, nome, email FROM usuarios WHERE id = $1',
    [id]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
}

async function criar({ nome, email }) {
  const result = await db.query(
    'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING id',
    [nome, email]
  );

  const id = result.rows[0].id;

  return buscarPorId(id);
}

async function atualizar(id, { nome, email }) {
  const result = await db.query(
    'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3',
    [nome, email, id]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return buscarPorId(id);
}

async function remover(id) {
  const result = await db.query('DELETE FROM usuarios WHERE id = $1', [id]);

  return result.rowCount > 0;
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};
