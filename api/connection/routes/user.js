const express =require('express');
const router=express.Router();

const connectToDatabase=require('./connection');

const jwt=require('jsonwebtoken');

router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();

    // Obtén una referencia a la colección "productos"
    const collection = db.collection('productos');

    // Realiza la consulta en MongoDB
    const products = await collection.find().toArray();

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});


router.post('/adduser',(req,res)=>{
    const { userName, pass, roleId } = req.body;

    mysqlConnection.query(
        'INSERT INTO users (userName, pass, roleId) VALUES (?, ?, ?)',
        [userName, pass, roleId],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error al crear el usuario' });
          }
    
          console.log(result);
          return res.status(201).json({ message: 'Usuario creado exitosamente' });
        }
      );

});

router.delete('/deleteuser/:id', (req, res) => {
  const id = req.params.id;
  
  mysqlConnection.query(
    'DELETE FROM users WHERE id = ?', 
    [id], 
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error al eliminar el usuario' });
      }

      console.log(result);
      return res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    }
  );
});



router.put('/updateuser/:id', (req, res) => {
    const id = req.params.id;
    const { userName, pass, roleId } = req.body;
  
    mysqlConnection.query(
      'UPDATE users SET userName = ?, pass = ?, roleId = ? WHERE id = ?',
      [userName, pass, roleId, id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Error al actualizar el usuario' });
        }
  
        console.log(result);
        return res.status(200).json({ message: 'Usuario actualizado exitosamente' });
      }
    );
  });

  router.get('/getuser/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
      'SELECT * FROM users WHERE id = ?',
      [id],
      (err, rows) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Error al obtener el usuario' });
        }
  
        if (rows.length === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
  
        console.log(rows[0]);
        return res.status(200).json(rows[0]);
      }
    );
  });
  
  

router.post('/singin',(req,res)=>{
    //console.log(req.body);
    const {userName,pass}=req.body;
    mysqlConnection.query('select id,pass,userName,roleId from users where username=? and pass=?',
    [userName,pass],
    (err,rows,fields)=>{
        if(!err){
           // console.log(rows);
           if(rows.length>0){
            let data= JSON.stringify(rows[0]);
            const token=jwt.sign(data,'stil');
            res.json({token});
            console.log({token});
            //console.log(data);
           }else{
            //console.log('Usuario o clave incorrectos')
            res.json('Usuario o clave incorrecto');
           }
        }else{
            console.log(err);
        }
    }
    )
})

router.post('/test',verifyToken,(req,res)=>{
    console.log(req.data);
    //if(req.data.roleId=='user'){
//
   // }
    res.json('Informacion secreta');
})

function verifyToken(req,res,next){
    if(!req.headers.authorization) return res.status(401).json('NO Autorizado');

   const token=req.headers.authorization.substr(7);
    if(token!==''){
       const content= jwt.verify(token,'stil');
       //console.log(content);
       req.data=content;
       next();
    }else{
        res.status(401).json('Token vacio');
    }
    
}


module.exports=router;