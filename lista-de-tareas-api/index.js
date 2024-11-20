const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const puerto = 3000;

app.use(bodyParser.json());
app.use(cors());

const tareas = [];

app.get('/tareas', (req, res) => {
    res.json(tareas);
});

app.post('/tareas', (req, res) => {
    const { titulo, descripcion } = req.body;
    if (!titulo || !descripcion) {
        return res.status(400).json({ mensaje: 'Título y descripción son obligatorios' });
    }
    const nuevaTarea = { id: tareas.length + 1, titulo, descripcion };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

app.patch('/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const tarea = tareas.find((t) => t.id === id);

    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tarea.completada = req.body.completada !== undefined ? req.body.completada : tarea.completada;
    res.json(tarea);
});

app.delete('/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const indice = tareas.findIndex((t) => t.id === id);

    if (indice === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tareas.splice(indice, 1);
    res.status(204).send();
});

app.put('/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const tarea = tareas.find((t) => t.id === id);

    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tarea.titulo = req.body.titulo || tarea.titulo;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;

    res.json(tarea);
});

app.listen(puerto, () => {
    console.log(`API escuchando en http://localhost:${puerto}`);
});