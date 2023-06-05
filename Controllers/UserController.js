const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/User");

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    // Chequea si el nombre de usuario ya existe
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send('El nombre de usuario ya existe');

    // Cifrado de contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Crea nuevo usuario
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      language: req.body.language,
      course: req.body.course,
      interests: req.body.interests,
    });

    // Guarda usuario y devuelve respuesta
    const savedUser = await newUser.save();
    res.send({ user: savedUser._id });

  } catch (err) {
    res.status(400).send(err);
  }
});

// Inicio de sesión del usuario
router.post('/login', async (req, res) => {
  try {
    // Chequea si el nombre de usuario existe
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Nombre de usuario o contraseña incorrectos');

    // Compara la contraseña
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Nombre de usuario o contraseña incorrectos');

    // Retorna éxito
    res.send('Inicio de sesión exitoso');

  } catch (err) {
    res.status(400).send(err);
  }
});

// Obtén el perfil de un usuario
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).send('Usuario no encontrado');

    // En un escenario real, probablemente querrías omitir la contraseña en la respuesta
    const { password, ...others } = user._doc;
    res.send(others);

  } catch (err) {
    res.status(500).send(err);
  }
});

// Actualiza el perfil de un usuario
router.put('/profile/:username', async (req, res) => {
  try {
    // Esta es solo una actualización básica, puedes agregar más validación y funcionalidad
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true }
    );
    if (!user) return res.status(404).send('Usuario no encontrado');

    res.send('Perfil actualizado');

  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
