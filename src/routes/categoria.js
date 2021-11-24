const express = require ('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/', async (req, res) =>{
    let listCategoria = await pool.query('SELECT * FROM categoria');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listCategoria: listCategoria
    });
});

router.get('/:id_categoria', async (req, res) =>{
    const { id_categoria } = req.params;
    let categoria = await pool.query('SELECT * FROM categoria WHERE id_categoria = ?', [id_categoria]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        categoria: categoria
    });
});

router.post('/create', async (req, res) => {
    const {nombre} = req.body;
    const categoria = {
        nombre
    };

    await pool.query('INSERT INTO categoria set ?', [categoria]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente",
        categoria: categoria
    })
});

router.post('/update/:id_categoria', async (req, res) => {
    const { id_categoria } = req.params;
    const { nombre } = req.body;

    const categoria = { nombre };

    await pool.query('UPDATE categoria SET ? WHERE id_categoria = ?', [categoria, id_categoria]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        categoria: categoria
    })
})

router.post('/delete/:id_categoria', async (req, res) => {
    const { id_categoria } = req.params;
    
    await pool.query('DELETE FROM categoria WHERE id_categoria = ?', [id_categoria]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente",
    })
})

module.exports = router;