const express = require('express');
const connection = require('../connection');
const router = express.Router();

// Obtener todos los usuarios
router.get('/list', (req, res) => {
    connection.query('SELECT * FROM usuario', (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al obtener los usuarios' });
      } else {
        res.json(results);
      }
    });
  });

//obtener usuario sergun ci
router.get('/buscar/:ci', (req, res) => {
    const { ci } = req.params;
    connection.query('SELECT * FROM USUARIO WHERE ci = ?', [ci], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al obtener el usuario' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
          res.json(results[0]);
        }
      }
    });
  });

//crear usuario
router.post('/create/', (req, res) => {
    const { ci, nombre, ap_paterno, ap_materno, contraseña, email, telefono, genero, rol, estado, MUNICIPIO_id_municipio } = req.body;
    connection.query('INSERT INTO USUARIO (ci, nombre, ap_paterno, ap_materno, contraseña, email, telefono, genero, rol, estado, MUNICIPIO_id_municipio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [ci, nombre, ap_paterno, ap_materno, contraseña, email, telefono, genero, rol, estado, MUNICIPIO_id_municipio], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al crear el usuario' });
      } else {
        res.json({ ci, nombre, ap_paterno, ap_materno, contraseña, email, telefono, genero, rol, estado, MUNICIPIO_id_municipio });
      }
    });
  });

//actualizar usuario
router.put('/update/:ci', (req, res) => {
    const { ci } = req.params;
    const { nombre, ap_paterno, ap_materno, contraseña, email, telefono, genero, rol, estado, MUNICIPIO_id_municipio } = req.body;
    connection.query('UPDATE USUARIO SET nombre = ?, ap_paterno = ?, ap_materno = ?, contraseña = ?, email = ?, telefono = ?, genero = ?, rol = ?, estado = ?, MUNICIPIO_id_municipio = ? WHERE ci = ?', [nombre, ap_paterno, ap_materno, contraseña, email, telefono, genero, rol, estado, MUNICIPIO_id_municipio, ci], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al actualizar el usuario' });
      } else {
        res.json({ message: 'Usuario actualizado correctamente' });
      }
    });
  });

//eliminar usuario
router.delete('/delete/:ci', (req, res) => {
    const { ci } = req.params;
    connection.query('DELETE FROM USUARIO WHERE ci = ?', [ci], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al eliminar el usuario' });
      } else {
        res.json({ message: 'Usuario eliminado correctamente' });
      }
    });
  });


module.exports = router;