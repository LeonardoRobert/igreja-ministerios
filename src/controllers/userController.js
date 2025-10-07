const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.getUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  User.create({ name, email, password: hashedPassword }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  });
};

exports.updateUser = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  User.update(req.params.id, { name, email, password: hashedPassword }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuário atualizado com sucesso!' });
  });
};

exports.deleteUser = (req, res) => {
  User.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuário excluído com sucesso!' });
  });
};
