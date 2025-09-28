import express from 'express';
import Message from '../models/Message.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll({ include: User });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id, { include: User });
    if (!message) return res.status(404).json({ error: 'Mensagem não encontrada' });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, content } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const message = await Message.create({ userId, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Message.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Mensagem não encontrada' });

    const message = await Message.findByPk(req.params.id);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Message.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Mensagem não encontrada' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
