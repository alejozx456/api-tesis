const express =require('express');
const router=express.Router();

const mysqlConnection=require('./connection');

router.get('/',(req,res)=>{
    mysqlConnection.query('select * from grupo_preguntas',(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});


router.post('/addgrupopregunta', (req, res) => {
    const nombre = req.body.nombre;
    const estado = req.body.estado;
  
    mysqlConnection.query('INSERT INTO grupo_preguntas (nombre, estado) VALUES (?, ?)', [nombre, estado], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error al crear el grupo Pregunta' });
      }
  
      console.log(result);
      return res.status(201).json({ message: 'Grupo Pregunta creada exitosamente' });
    });
  });


module.exports=router;