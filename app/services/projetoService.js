const db = require('../db');

async function listar() {
  const result = await db.query(
      'SELECT ' +
      'p.nome, p.descricao, p.objetivo, d.total, p.data_criacao' +
      ' FROM projeto p JOIN ' +
      '(SELECT '+
      'SUM(valor) total, id_projeto '+
      'FROM doacoes '+
      'GROUP BY id_projeto) d '+
      'ON p.id = d.id_projeto'
  );
  return result.rows;
}

async function buscarPorId(id) {

  const result = await db.query(
      'SELECT ' +
      'p.nome, p.descricao, p.objetivo, d.total, p.data_criacao' +
      ' FROM projeto p JOIN ' +
      '(SELECT '+
      'SUM(valor) total, id_projeto '+
      'FROM doacoes '+
      'GROUP BY id_projeto) d '+
      'ON p.id = d.id_projeto'+
      'WHERE p.id = $1 ',
      [id]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
}

async function criar({ nome, descricao, objetivo }) {
  const result = await db.query(
    'INSERT INTO projeto ( nome, descricao, objetivo)'+
    'VALUES ( $1, $2, $3 ) RETURNING id'+
    [nome, descricao, objetivo]
  );

  const id = result.rows[0].id;

  return buscarPorId(id);
}

async function atualizar(id, { nome, descricao, objetivo }) {
  const result = await db.query(
    'UPDATE projeto SET nome = $1, descricao = $2, objetivo = $3 WHERE id = $4',
    [nome, descricao, objetivo, id]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return buscarPorId(id);
}

async function remover(id) {
  const result = await db.query('DELETE FROM projeto WHERE id = $1', [id]);

  return result.rowCount > 0;
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};
