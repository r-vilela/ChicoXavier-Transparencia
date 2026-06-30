const service = require('../services/doacoesService');

async function listar(req, res, next) {
  try {
    const doacoes = await service.listar();
    res.json(doacoes);
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const doacao = await service.buscarPorId(req.params.id);

    if (!doacao) {
      return res.status(404).json({ erro: 'Doacao nao encontrado' });
    }

    return res.json(doacao);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  const { id_projeto, valor } = req.body;

  if (!id_projeto || !valor) {
    return res.status(400).json({ erro: 'Id do projeto e valor sao obrigatorios' });
  }

  try {
    const doacao = await service.criar({ id_projeto, valor });
    return res.status(201).json(doacao);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  const { id_projeto, valor } = req.body;

  if (!id_projeto || !valor) {
    return res.status(400).json({ erro: 'Id do projeto e valor sao obrigatorios' });
  }

  try {
    const doacao = await service.atualizar(req.params.id, { id_projeto, valor });

    if (!doacao) {
      return res.status(404).json({ erro: 'Projeto nao encontrado' });
    }

    return res.json(doacao);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    const removido = await service.remover(req.params.id);

    if (!removido) {
      return res.status(404).json({ erro: 'Despesa nao encontrado' });
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};
