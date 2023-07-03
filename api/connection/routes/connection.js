const { MongoClient,ObjectId } = require('mongodb');

// URL de conexión a la base de datos
const url = 'mongodb+srv://alejozx456:jCRgs7mPDrgiQtru@base.3fnozty.mongodb.net/?retryWrites=true&w=majority';

// Nombre de la base de datos
const dbName = 'base-ecommerce';

// Crear una instancia del cliente de MongoDB
const client = new MongoClient(url);

// Conectarse a la base de datos
async function connectToDatabase() {
    try {
      // Conectarse a la base de datos
      await client.connect();
      console.log('Conectado a la base de datos');
    
      // Obtener una referencia a la base de datos
      const db = client.db(dbName);
    
      return db;
    } catch (error) {
      console.error('Error al conectarse a MongoDB:', error);
      throw error;
    }
  }
module.exports=connectToDatabase