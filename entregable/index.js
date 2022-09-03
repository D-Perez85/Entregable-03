const Contenedor = require('./Contenedor'); 
const express = require('express'); 
require('dotenv').config()

const PORT = process.env.PORT || 8080; 
const app = express();

app.listen(PORT, function () {
    console.log(`Servidor esta escuchando en puerto ${PORT}`);
});

const productos = new Contenedor('productos.txt');

app.get('/', async (req, res) => {
     res.send(`Pagina de inicio  -  Utilize las rutas productos  / productoRandom para visualizar los datos`);
})

app.get('/productos', async (req, res) => {
        const mostrarProductos = await productos.GetAll();
        res.send(mostrarProductos);
    })

app.get('/productoRandom', async (req, res) => {
    const p = await productos.GetAll();
    const numeroRandom = Math.floor(Math.random() * p.length);
    res.send(p[numeroRandom]);
})

app.on('error', err => console.log(`Error: ${err}`));


