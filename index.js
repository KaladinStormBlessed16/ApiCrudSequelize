const express = require('express')
const app = express()
const sequelize = require('./database/db');
require('./database/Associations');
const routes = require('./routes/routes');

const PORT = process.env.PORT ||  3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.listen(PORT, function() {
    console.log(`Escuchando en el puerto ${PORT}`)
    sequelize.sync({ force: false }).then(() => {
        console.log("Conexión a Base de Datos establecida");
    }).catch(error => {
        console.log('Se ha producido un error', error);
    })
});

module.exports = app