const News = require('../models/News');

const NewsController = {
    async create(req, res) {
        try {
            const news = await News.create({...req.body});
            res.status(201).send(news);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un problema al tratar de crear la noticia'});
        }
    },
    async getAll(req, res) {
        try {
            const news = await News.find().sort({date: -1});
            res.send(news);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un problema al tratar de obtener las noticias'});
        }
    },
    async getById(req, res) {
        try {
            const news = await News.findById(req.params._id);
            res.send(news);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un problema al tratar de obtener la noticia'});
        }
    },
    async update(req, res) {
        try {
            const news = await News.findByIdAndUpdate(req.params._id, req.body, {new: true});
            res.send(news);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un problema al tratar de actualizar la noticia'});
        }
    },
    async delete(req, res) {
        try {
            await News.findByIdAndDelete(req.params._id);
            res.send({message: 'Noticia eliminada correctamente'});
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un problema al tratar de eliminar la noticia'});
        }
    },
    async getLatest(req, res) {
        try {
            const news = await News.find().sort({date: -1}).limit(5);
            res.send(news);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un problema al tratar de obtener las últimas noticias'});
        }
    },
}

module.exports = NewsController;
