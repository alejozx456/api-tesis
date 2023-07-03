const express= require('express');

const app= express();
const bodyParser=require('body-parser');

const cors=require('cors');

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(bodyParser.json());

app.use(cors());


//routes

const productRoute=require('./api/connection/routes/products');
app.use('/products',productRoute);

//User
const userRoute=require('./api/connection/routes/user');

app.use('/user',userRoute);

//Procesos

const procesosRoute=require('./api/connection/routes/proceso');

app.use('/proceso',procesosRoute);

//tipoFormulario

const tipoFormularioRoute=require('./api/connection/routes/tipoFormulario');
app.use('/tipoformulario',tipoFormularioRoute);

//GrupoPregunta

const grupoPregunta=require('./api/connection/routes/grupoPregunta');
app.use('/grupopregunta',grupoPregunta);

//  Formulario

const formulario=require('./api/connection/routes/formulario');
app.use('/formulario',formulario);

module.exports=app;



