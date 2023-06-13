const Event = require('../models/Event');

const EventController = {
    async create(req, res) {
        try {
            const event = await Event.create(req.body);
            res.status(201).send(event);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Hubo un problema al tratar de crear el evento' });
        }
    },
    async getAll(req, res) {
        try {
            const events = await Event.find().populate({ path: 'createdBy'})
            .populate({ path: 'attendees'})
            .populate({ path: 'tags'})
            .populate({ path: 'createdBy'});
            res.send(events);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Hubo un problema al tratar de obtener los eventos' });
        }
    }
    ,
    async getById(req, res) {
        try {
            const event = await Event.findById(req.params._id).populate({ path: 'createdBy'})
            .populate({ path: 'attendees'})
            .populate({ path: 'tags'})
            .populate({ path: 'createdBy'});
            res.send(event);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Hubo un problema al tratar de obtener el evento' });
        }
    },
    async update(req, res) {
        try {
            const event = await Event.findByIdAndUpdate(req.params._id, req.body, { new: true });
            res.send(event);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Hubo un problema al tratar de actualizar el evento' });
        }
    },
    async delete(req, res) {
        try {
            await Event.findByIdAndDelete(req.params._id);
            res.send({ message: 'Evento eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Hubo un problema al tratar de eliminar el evento' });
        }
    },
    async attend(req, res) {
        try {
            const event = await Event.findById(req.params.id);
            event.attendees.push(req.user.id);
            await event.save();
            res.send(event);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Hubo un problema al tratar de asistir al evento' });
        }
    },
}

module.exports = EventController;
