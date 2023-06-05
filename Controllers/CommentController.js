const Comment = require('../models/Comment');

const CommentController = {
    async create(req, res) {
        try {
            const comment = await Comment.create({...req.body, userId : req.user._id})
            res.status(201).send(comment)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el comment' })
        }
    },

    async update(req, res) {
        try {
            const comment = await Comment.findByIdAndUpdate(
                req.params._id, req.body,
                {new: true})
            res.status(201).send(comment)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al actualizar el comment' })
        }
    },

    async delete(req, res) {
        try {
            const comment = await Comment.findByIdAndDelete(req.params._id);
            if (!comment) {
                return res.status(404).send({ message: 'No se encontró el comentario' });
            }
            res.status(200).send({ message: 'Comentario eliminado correctamente' });
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al eliminar el comentario' });
        }
    }
}

module.exports = CommentController;
