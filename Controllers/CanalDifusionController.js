const CanalDifusion = require('../models/CanalDifusion');

const canalDifusionController = {
  // Crear un canal de difusión
  async create(req, res) {
    try {
      const canalDifusion = await CanalDifusion.create(req.body);
      res.status(201).send({msessage:'canal creado con exito',canalDifusion});
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al crear el canal de difusión' });
    }
  },

  // Obtener todos los canales de difusión
  async getAll(req, res) {
    try {
      const canalesDifusion = await CanalDifusion.find()
        .populate('name')
        .populate('events')
        .populate('participantes')
        .populate('createdBy');
      res.send(canalesDifusion);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al obtener los canales de difusión' });
    }
  },

  // Obtener un canal de difusión por ID
  async getById(req, res) {
    try {
      const canalDifusion = await CanalDifusion.findById(req.params._id).populate({ path: 'name'})
      .populate({ path: 'events'})
      .populate({ path: 'participantes'})
      .populate({ path: 'createdBy'});;
      if (!canalDifusion) {
        return res.status(404).send({ message: 'No se encontró el canal de difusión' });
      }
      res.send(canalDifusion);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al obtener el canal de difusión' });
    }
  },

  // Actualizar un canal de difusión
  async update(req, res) {
    try {
      const canalDifusion = await CanalDifusion.findByIdAndUpdate(req.params._id, req.body, { new: true });
      if (!canalDifusion) {
        return res.status(404).send({ message: 'No se encontró el canal de difusión' });
      }
      res.send(canalDifusion);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al actualizar el canal de difusión' });
    }
  },

  // Eliminar un canal de difusión
  async delete(req, res) {
    try {
      const canalDifusion = await CanalDifusion.findByIdAndDelete(req.params._id);
      if (!canalDifusion) {
        return res.status(404).send({ message: 'No se encontró el canal de difusión' });
      }
      res.send({ message: 'Canal de difusión eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al eliminar el canal de difusión' });
    }
  },
};

module.exports = canalDifusionController;
