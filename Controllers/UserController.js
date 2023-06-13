const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();
const { uploadUserImg } = require("../Middleware/upload")



const UserController = {
  async register(req, res) {
    try {
      const { name, email, password,imageURL } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ ...req.body ,name, email, password: hashedPassword, imageURL });
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
      res.send({ message: "Bienvenid@ " + user.name, token ,user});
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
      const user = await User.findById(req.user._id).populate({ path: 'course'})
      .populate({ path: 'conocimientos'})
      .populate({ path: 'quieroAprender'})
      .populate({ path: 'interests'});
      res.send(user);
    } catch (error) {
      console.error(error);
 // Pasar el error al siguiente middleware o controlador de errores
    }
  },
  async userInfoById(req, res, next) {
    try {
      const user = await User.findById(req.params._id).populate({ path: 'course'})
      .populate({ path: 'conocimientos'})
      .populate({ path: 'quieroAprender'})
      .populate({ path: 'interests'});
      res.send(user);
    } catch (error) {
      console.error(error);
      next(error); // Pasar el error al siguiente middleware o controlador de errores
    }
  },
  async getAll(req, res) {
    try {
      const users = await User.find().populate({ path: 'course'})
      .populate({ path: 'conocimientos'})
      .populate({ path: 'quieroAprender'})
      .populate({ path: 'interests'});
      res.send({ message: "Usuarios mostrados con éxito", users });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hubo un problema al obtener los usuarios" });
    }
  },
  
  async update(req, res) {
    try {
      if (!req.user || !req.user._id) {
        throw new Error('User ID not found');
      }
  
      uploadUserImg.single('profileImage')(req, res, async function (err) {
        if (err) {
          return res.status(400).send({ message: 'Error al cargar la imagen', error: err });
        }
  
        try {
          const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: req.body },
            { new: true }
          );
          res.send({ message: 'Usuario actualizado correctamente', user: updatedUser });
        } catch (error) {
          console.error(error);
          res.status(500).send(error);
        }
      });
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
  },
  async updateFirstOnBoard(req, res) {
    try {
      const { firstOnBoard } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { firstOnBoard } },
        { new: true }
      );
      res.send(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
};

module.exports = UserController;
