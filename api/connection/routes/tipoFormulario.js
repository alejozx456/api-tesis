const express =require('express');
const router=express.Router();

const mysqlConnection=require('./connection');

router.get('/',(req,res)=>{
    mysqlConnection.query('select * from tipo_formulario',(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/addtipoformulario', (req, res) => {
  const tipo = req.body.tipo;
  const estado = req.body.estado;

  mysqlConnection.query('INSERT INTO tipo_formulario (tipo, estado) VALUES (?, ?)', [tipo, estado], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error al crear el tipo de formulario' });
    }

    console.log(result);
    return res.status(201).json({ message: 'Tipo de formulario creado exitosamente' });
  });
});

router.put('/updatetipoformulario/:id', (req, res) => {
  const id = req.params.id;
  const tipo = req.body.tipo;
  const estado = req.body.estado;

  mysqlConnection.query('UPDATE tipo_formulario SET tipo = ?, estado = ? WHERE id = ?', [tipo, estado, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error al actualizar el tipo de formulario' });
    }

    console.log(result);
    return res.status(200).json({ message: 'Tipo de formulario actualizado exitosamente' });
  });
});



router.put('/updateestadopf/:id', (req, res) => {
    const id = req.params.id;
    const { estado } = req.body;
  
    mysqlConnection.query('UPDATE tipo_formulario SET estado = ? WHERE id = ?', [estado, id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error al actualizar el estado del tipo de formulario' });
      }
  
      console.log(result);
      return res.status(200).json({ message: 'Estado del tipo de formulario actualizado exitosamente' });
    });
  });
  


module.exports=router;