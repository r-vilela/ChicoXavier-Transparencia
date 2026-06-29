const service = require('../services/projetoService');

async function listar(req, res, next) {
  try {
    const projetos = await service.listar();
    res.json(projetos);
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const projeto = await service.buscarPorId(req.params.id);

    if (!projeto) {
      return res.status(404).json({ erro: 'Projeto nao encontrado' });
    }

    return res.json(projeto);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  const { nome, descricao, objetivo } = req.body;

  if (!nome || !descricao || !objetivo) {
    return res.status(400).json({ erro: 'Nome, descricao e Objetivo sao obrigatorios' });
  }

  try {
    const projeto = await service.criar({ nome, descricao, objetivo });
    return res.status(201).json(projeto);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  const { nome, descricao, objetivo } = req.body;

  if (!nome || !descricao || !objetivo) {
    return res.status(400).json({ erro: 'Nome, descricao e Objetivo sao obrigatorios' });
  }

  try {
    const projeto = await service.atualizar(req.params.id, { nome, descricao, objetivo });

    if (!projeto) {
      return res.status(404).json({ erro: 'Projeto nao encontrado' });
    }

    return res.json(projeto);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    const removido = await service.remover(req.params.id);

    if (!removido) {
      return res.status(404).json({ erro: 'Projeto nao encontrado' });
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
