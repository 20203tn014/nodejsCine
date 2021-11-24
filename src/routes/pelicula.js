const express = require ('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/', async (req, res) =>{
    let listPelicula = await pool.query('SELECT * FROM pelicula');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listPelicula: listPelicula
    });
});

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let pelicula = await pool.query('SELECT * FROM pelicula WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        pelicula: pelicula
    });
});

router.post('/create', async (req, res) => {
    const {titulo, descripcion, sinopsis, rating, fecha_registro, fecha_actualizacion, estado, id_categoria} = req.body;
    const pelicula = {
        titulo, descripcion, sinopsis, rating, fecha_registro, fecha_actualizacion, estado, id_categoria
    };

    await pool.query('INSERT INTO pelicula set ?', [pelicula]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente",
        pelicula: pelicula
    })
});

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, sinopsis, rating, fecha_registro, fecha_actualizacion, estado, id_categoria } = req.body;

    const pelicula = { titulo, descripcion, sinopsis, rating, fecha_registro, fecha_actualizacion, estado, id_categoria };

    await pool.query('UPDATE pelicula SET ? WHERE id = ?', [pelicula, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        pelicula: pelicula
    })
})

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    
    await pool.query('DELETE FROM pelicula WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente",
    })
})

module.exports = router;