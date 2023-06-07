const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();

const UserController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      if (req.body.role) {
        user.role = req.body.role;
      }
      res.status(201).send({ message: "Usuario registrado con éxito", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error();
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      if (user.tokens && user.tokens.length > 4) {
        user.tokens.shift();
      }
      user.tokens.push(token);
      await user.save();
      res.send({ message: "Bienvenid@ " + user.name, token });
    } catch (error) {
      console.error(error);
      res.status(401).send({ message: 'Email or password incorrect' });
    }
  },

  async logout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token != req.headers.authorization;
      });
      await req.user.save();
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hubo un problema al intentar desconectar al usuario" });
    }
  },

  async getInfo(req, res, next) {
    try {
      const user = await User.findById(req.user._id);
      res.send(user);
    } catch (error) {
      console.error(error);
      next(error); // Pasar el error al siguiente middleware o controlador de errores
    }
  },

  async update(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params._id,
        { $set: req.body },
        { new: true }
      );
      res.send(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params._id);
      res.send(deletedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
};

module.exports = UserController;
