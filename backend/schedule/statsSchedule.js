const schedule = require('node-schedule');

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first();
        const categoriesCount = await app.db('categories').count('id').first();
        const appointmentsCount = await app.db('appointments').count('id').first();

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt' : -1 } })

        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            appointments: appointmentsCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeAppointments = !lastStat || stat.appontments !== lastStat.appontments;

        if(changeUsers || changeCategories || changeAppointments) {
            stat.save().then(() => console.log('[Stats] Updated statistics!'));
        };
    });
};
