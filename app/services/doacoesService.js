const db = require('../db');

async function listar() {
  const result = await db.query(
    'SELECT '+
    'p.nome, d.valor, d.data_criacao '+
    'FROM doacoes d '+
    'JOIN projeto p '+
    'ON p.id=d.id_projeto'
  );
  return result.rows;
}

async function buscarPorId(id) {

  const result = await db.query(
    'SELECT '+
    'p.nome, d.valor, d.data_criacao '+
    'FROM doacoes d '+
    'JOIN projeto p '+
    'ON p.id=d.id_projeto'+
    'WHERE d.id = $1 ',
    [id]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
}

async function criar({ id_projeto, valor }) {
  const result = await db.query(
    'INSERT INTO doacoes ( id_projeto, valor )'+
    'VALUES ( $1, $2 ) RETURNING id',
    [id_projeto, valor]
  );

  const id = result.rows[0].id;

  return buscarPorId(id);
}

async function atualizar(id, { id_projeto, valor }) {
  const result = await db.query(
    'UPDATE doacoes SET id_projeto = $1, valor = $2 WHERE id = $3',
    [id_projeto, valor, id]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return buscarPorId(id);
}

async function remover(id) {
  const result = await db.query('DELETE FROM doacoes WHERE id = $1', [id]);

  return result.rowCount > 0;
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};
