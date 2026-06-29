const service = require('../services/despesaService');

async function listar(req, res, next) {
  try {
    const despesas = await service.listar();
    res.json(despesas);
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const despesa = await service.buscarPorId(req.params.id);

    if (!despesa) {
      return res.status(404).json({ erro: 'Projeto nao encontrado' });
    }

    return res.json(despesa);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
    const { id_projeto, valor, causa } = req.body;

  if (!id_projeto || !valor || !causa) {
    return res.status(400).json({ erro: 'Id do projeto, valor e causa sao obrigatorios' });
  }

  try {
    const despesa = await service.criar({ id_projeto, valor, causa });
    return res.status(201).json(despesa);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
    const { id_projeto, valor, causa } = req.body;

  if (!id_projeto || !valor || !causa) {
    return res.status(400).json({ erro: 'Id do projeto, valor e causa sao obrigatorios' });
  }

  try {
    const despesa = await service.atualizar(req.params.id, { id_projeto, valor, causa });

    if (!despesa) {
      return res.status(404).json({ erro: 'Projeto nao encontrado' });
    }

    return res.json(despesa);
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
