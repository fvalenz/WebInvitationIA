const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const db = new sqlite3.Database('./gallery.db');

// Configuración de Multer para almacenar imágenes en la carpeta "gallery"
const storage = multer.diskStorage({
    destination: './gallery/',
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
    }
});

const upload = multer({ storage: storage });

// Crear la tabla de imágenes si no existe
db.run('CREATE TABLE IF NOT EXISTS images(id INTEGER PRIMARY KEY, filename TEXT)');

// Ruta para subir imágenes
app.post('/upload', upload.array('images'), (req, res) => {
    const images = req.files.map(file => [file.filename]);
    const placeholders = images.map(() => '(?)').join(',');

    db.run(`INSERT INTO images(filename) VALUES ${placeholders}`, images.flat(), function(err) {
        if (err) {
            return res.status(500).send("Error al guardar las imágenes.");
        }
        res.redirect('/');
    });
});

// Ruta para recuperar imágenes
app.get('/get-images', (req, res) => {
    db.all('SELECT filename FROM images', [], (err, rows) => {
        if (err) {
            return res.status(500).send("Error al recuperar las imágenes.");
        }
        res.json(rows);
    });
});

// Servir imágenes y HTML
app.use('/gallery', express.static('gallery'));
app.use(express.static('public')); // carpeta para HTML, CSS, JS

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
