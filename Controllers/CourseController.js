const Course = require('../models/Course');

const CourseController = {
    async create(req, res) {
        try {
            const course = await Course.create({...req.body})
            res.status(201).send(course)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el course' })
        }
    },

    async update(req, res) {
        try {
            const course = await Course.findByIdAndUpdate(
                req.params._id, req.body,
                {new: true})
            res.status(201).send(course)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al actualizar el course' })
        }
    },

    async delete(req, res) {
        try {
            const course = await Course.findByIdAndDelete(req.params._id);
            if (!course) {
                return res.status(404).send({ message: 'No se encontró el comentario' });
            }
            res.status(200).send({ message: 'Comentario eliminado correctamente' });
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al eliminar el comentario' });
        }
    }
}

module.exports = CourseController;
