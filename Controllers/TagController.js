const Tag = require('../models/Tag');

const tagController = {
  async create(req, res) {
    try {
      const { name } = req.body;
      const tag = await Tag.create({ name });
      res.status(201).send(tag);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al tratar de crear el tag' });
    }
  },

  async getAll(req, res) {
    try {
      const tags = await Tag.find();
      res.send({ message: 'Tags obtenidos con éxito', tags });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al tratar de obtener los tags' });
    }
  },

  async getById(req, res) {
    try {
      const tag = await Tag.findById(req.params._id);
      if (!tag) {
        return res.status(404).send({ message: 'Tag no encontrado' });
      }
      res.send(tag);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al tratar de obtener el tag' });
    }
  },

  async update(req, res) {
    try {
      const { name } = req.body;
      const tag = await Tag.findByIdAndUpdate(req.params._id, { name }, { new: true });
      if (!tag) {
        return res.status(404).send({ message: 'Tag no encontrado' });
      }
      res.send(tag);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al tratar de actualizar el tag' });
    }
  },

  async delete(req, res) {
    try {
      const tag = await Tag.findByIdAndDelete(req.params._id);
      if (!tag) {
        return res.status(404).send({ message: 'Tag no encontrado' });
      }
      res.send({ message: 'Tag eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al tratar de eliminar el tag' });
    }
  },
};

module.exports = tagController;
