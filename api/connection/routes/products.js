const express =require('express');
const router=express.Router();
const {  ObjectId } = require('mongodb');
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

router.get('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();

    // Obtén una referencia a la colección "productos"
    const collection = db.collection('productos');

    const { id } = req.params;

    // Realiza la consulta en MongoDB buscando por el _id
    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

router.get('/categories', async (req, res) => {
    try {
      const db = await connectToDatabase();
  
      // Obtén una referencia a la colección "productos"
      const collection = db.collection('categories');
  
      // Realiza la consulta en MongoDB
      const categories = await collection.find().toArray();
  
      res.json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener las categorias' });
    }
  });

  router.get('/category/:category', async (req, res) => {
    try {
      const db = await connectToDatabase();
  
      // Obtén una referencia a la colección "productos"
      const collection = db.collection('productos');

      const { category } = req.params;
      const { sort, limit } = req.query;

      const products = await collection
      .find({ category })
      .sort({ _id: sort === 'desc' ? -1 : 1 })
      .limit(Number(limit))
      .toArray();
  
      
  
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });

module.exports=router;