const express =require('express');
const router=express.Router();

const mysqlConnection=require('./connection');

router.get('/',(req,res)=>{
    mysqlConnection.query('select * from proceso',(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/addproceso', (req, res) => {
    const nombre = req.body.nombre; // obtener el nombre del proceso desde el cuerpo de la solicitud
  
    mysqlConnection.query('INSERT INTO proceso (nombre) VALUES (?)', [nombre], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error al crear el proceso' });
      }
  
      console.log(result);
      return res.status(201).json({ message: 'Proceso creado exitosamente' });
    });
  });

  router.delete('/deleteproceso/:id', (req, res) => {
    const id = req.params.id; // Obtener el id del proceso desde la URL
    mysqlConnection.query('DELETE FROM proceso WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error al eliminar el proceso' });
      }
      console.log(result);
      return res.status(200).json({ message: 'Proceso eliminado exitosamente' });
    });
  });
  

  router.put('/updateproceso/:id', (req, res) => {
    const id = req.params.id; // obtener el ID del proceso desde la URL
    const nombre = req.body.nombre; // obtener el nuevo nombre del proceso desde el cuerpo de la solicitud
  
    mysqlConnection.query('UPDATE proceso SET nombre = ? WHERE id = ?', [nombre, id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error al actualizar el proceso' });
      }
  
      console.log(result);
      return res.status(200).json({ message: 'Proceso actualizado exitosamente' });
    });
  });
  
  

module.exports=router;