const Tag = require('../models/Tag');

const tagController = {
  async create(req, res) {
    try {
      
      const tag = await Tag.create({ ...req.body });
      res.status(201).send({message:'tag creada con exito',tag});
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al tratar de crear el tag' });
    }
  },

  async getAll(req, res) {
    try {
      const tags = await Tag.find();
      res.status(201).send({ message: 'Tags obtenidos con éxito', tags });
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
      res.status(201).send({message:'Tag encontrada con exito',tag})
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al tratar de obtener el tag' });
    }
  },

  async update(req, res) {
    try {
     
      const tag = await Tag.findByIdAndUpdate(req.params._id, { ...req.body}, { new: true });
      if (!tag) {
        return res.status(404).send({ message: 'Tag no encontrado' });
      }
      res.status(201).res.send({message:'Tag update con exito',tag})
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al tratar de actualizar el tag' });
    }
  },

  async delete(req, res) {
    try {
      const tag = await Tag.findByIdAndDelete(req.params._id);
      if (!tag) {
        return res.status(404).send({ message: 'Tag no encontrado',tag });
      }
      res.send({ message: 'Tag eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al tratar de eliminar el tag' });
    }
  },
};

module.exports = tagController;
