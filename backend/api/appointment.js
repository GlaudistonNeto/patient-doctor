const queries = require('./queries');

module.exports = app => {
    const { existsOrError } = app.api.validation;

    const save = (req, res) => {
        const appointment = { ...req.body };
        if(req.params.id) appointment.id = req.params.id;

        try {
            existsOrError(appointment.regarding, 'Regarding not informed');
            existsOrError(appointment.description, 'Description not informed');
            existsOrError(appointment.categoryId, 'Category not informed');
            existsOrError(appointment.userId, 'Doctor not informed');
            existsOrError(appointment.day, 'Day not informed');
            existsOrError(appointment.time, 'Hour not informed');
        } catch(msg) {
            res.status(400).send(msg);
        };

        if(appointment.id) {
            app.db('appointments')
                .update(appointment)
                .where({ id: appointment.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('appointments')
                .insert(appointment)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        };
    };

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('appointments')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Appointment not found.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        };
    };

    const limit = 10; // used for pagination
    const get = async (req, res) => {
        const page = req.query.page || 1;

        const result = await app.db('appointments').count('id').first();
        const count = parseInt(result.count);

        app.db('appointments')
            .select('id', 'regarding', 'description', 'day', 'time', 'categoryId')
            .limit(limit).offset(page * limit - limit)
            .then(appointments => res.json({ data: appointments, count, limit }))
            .catch(err => res.status(500).send(err));
    };

    const getById = (req, res) => {
        app.db('appointments')
            .where({ id: req.params.id })
            .first()
            .then(appointment => {
                appointment.content = appointment.content.toString()
                return res.json(appointment)
            })
            .catch(err => res.status(500).send(err));
    };

    const getByCategory = async (req, res) => {
        const cityId = req.params.id;
        const page = req.query.page || 1;
        const cities = await app.db.raw(queries.cityWithChildren, cityId);
        const ids = cities.rows.map(c => c.id);

        app.db({a: 'appointments', u: 'users'})
            .select('a.id', 'regarding', 'a.description', 'a.day', 'a.time', 'a.categoryId', { patient: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(appointments => res.json(appointments))
            .catch(err => res.status(500).send(err));
    };

    return { save, remove, get, getById, getByCategory };
};
