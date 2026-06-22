const service = require('../services/usuariosService');

async function listar(req, res, next) {
  try {
    const usuarios = await service.listar();
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const usuario = await service.buscarPorId(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuario nao encontrado' });
    }

    return res.json(usuario);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email sao obrigatorios' });
  }

  try {
    const usuario = await service.criar({ nome, email });
    return res.status(201).json(usuario);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email sao obrigatorios' });
  }

  try {
    const usuario = await service.atualizar(req.params.id, { nome, email });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuario nao encontrado' });
    }

    return res.json(usuario);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    const removido = await service.remover(req.params.id);

    if (!removido) {
      return res.status(404).json({ erro: 'Usuario nao encontrado' });
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
