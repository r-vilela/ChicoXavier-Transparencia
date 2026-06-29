const db = require('../db');

async function listar() {
  const result = await db.query(
      'SELECT '+
      'p.nome, d.valor, d.causa, d.data_criacao '+
      'FROM despesa d '+
      'JOIN projeto p '+
      'ON d.id_projeto=p.id'
  );
  return result.rows;
}

async function buscarPorId(id) {

  const result = await db.query(
      'SELECT '+
      'p.nome, d.valor, d.causa, d.data_criacao '+
      'FROM despesa d '+
      'JOIN projeto p '+
      'ON d.id_projeto=p.id'+
      'WHERE d.id = $1 ',
      [id]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
}

async function criar({ id_projeto, valor, causa }) {
  const result = await db.query(
    'INSERT INTO despesa ( id_projeto, valor, causa)'+
    'VALUES ( $1, $2, $3 ) RETURNING id',
    [id_projeto, valor, causa]
  );

  const id = result.rows[0].id;

  return buscarPorId(id);
}

async function atualizar(id, { id_projeto, valor, causa }) {
  const result = await db.query(
    'UPDATE despesa SET id_projeto = $1, valor = $2, causa = $3 WHERE id = $4',
    [id_projeto, valor, causa, id]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return buscarPorId(id);
}

async function remover(id) {
  const result = await db.query('DELETE FROM despesa WHERE id = $1', [id]);

  return result.rowCount > 0;
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};
