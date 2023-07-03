const express =require('express');
const router=express.Router();

const mysqlConnection=require('./connection');

router.get('/', (req, res) => {
    mysqlConnection.query(
      `SELECT
        f.id AS formulario_id,
        f.titulo AS formulario_titulo,
        f.descripcion AS formulario_descripcion,
        pro.nombre AS proceso_nombre,
        gru.nombre AS grupo_preguntas_nombre,
        t.tipo AS tipo_formulario_tipo,
        u.userName AS usuario_nombre,
        p.id AS pregunta_id,
        p.titulo AS pregunta_titulo,
        p.tipo AS pregunta_tipo,
        GROUP_CONCAT(o.valor SEPARATOR '|') AS opciones
      FROM formulario f
      INNER JOIN proceso pro ON f.id_proceso = pro.id
      INNER JOIN grupo_preguntas gru ON f.id_grupo_pregunta = gru.id
      INNER JOIN tipo_formulario t ON f.id_tipo_formulario = t.id
      INNER JOIN users u ON f.id_user = u.id
      INNER JOIN pregunta p ON f.id = p.formulario_id
      LEFT JOIN opcion o ON p.id = o.pregunta_id
      GROUP BY p.id`,
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Error al obtener los formularios');
        }
        
        const formularios = results.reduce((acc, result) => {
          const formularioExistente = acc.find(formulario => formulario.id === result.formulario_id);
          const pregunta = {
            id: result.pregunta_id,
            titulo: result.pregunta_titulo,
            tipo: result.pregunta_tipo,
            opciones: result.opciones ? result.opciones.split('|') : []
          };
  
          if (formularioExistente) {
            formularioExistente.preguntas.push(pregunta);
          } else {
            const nuevoFormulario = {
              id: result.formulario_id,
              titulo: result.formulario_titulo,
              descripcion: result.formulario_descripcion,
              proceso: result.proceso_nombre,
              grupoPreguntas: result.grupo_preguntas_nombre,
              tipoFormulario: result.tipo_formulario_tipo,
              usuario: result.usuario_nombre,
              preguntas: [pregunta]
            };
            acc.push(nuevoFormulario);
          }
  
          return acc;
        }, []);
  
        res.json(formularios);
      }
    );
  });


  router.get('/get', (req, res) => {
    mysqlConnection.query(
      `SELECT
        f.id AS formulario_id,
        f.titulo AS formulario_titulo,
        f.descripcion AS formulario_descripcion,
        pro.nombre AS proceso_nombre,
        gru.nombre AS grupo_preguntas_nombre,
        t.tipo AS tipo_formulario_tipo,
        u.userName AS usuario_nombre,
        p.id AS pregunta_id,
        p.titulo AS pregunta_titulo,
        p.tipo AS pregunta_tipo,
        p.respuesta AS respuesta,
        GROUP_CONCAT(o.valor SEPARATOR '|') AS opciones
      FROM formulario f
      INNER JOIN proceso pro ON f.id_proceso = pro.id
      INNER JOIN grupo_preguntas gru ON f.id_grupo_pregunta = gru.id
      INNER JOIN tipo_formulario t ON f.id_tipo_formulario = t.id
      INNER JOIN users u ON f.id_user = u.id
      INNER JOIN pregunta p ON f.id = p.formulario_id
      LEFT JOIN opcion o ON p.id = o.pregunta_id
      GROUP BY p.id`,
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Error al obtener los formularios');
        }
        
        const formularios = results.reduce((acc, result) => {
          const formularioExistente = acc.find(formulario => formulario.id === result.formulario_id);
          const pregunta = {
            id: result.pregunta_id,
            titulo: result.pregunta_titulo,
            tipo: result.pregunta_tipo,
            respuesta:result.respuesta,
            opciones: result.opciones ? result.opciones.split('|') : []
          };
  
          if (formularioExistente) {
            formularioExistente.preguntas.push(pregunta);
          } else {
            const nuevoFormulario = {
              id: result.formulario_id,
              titulo: result.formulario_titulo,
              descripcion: result.formulario_descripcion,
              proceso: result.proceso_nombre,
              grupoPreguntas: result.grupo_preguntas_nombre,
              tipoFormulario: result.tipo_formulario_tipo,
              usuario: result.usuario_nombre,
              preguntas: [pregunta]
            };
            acc.push(nuevoFormulario);
          }
  
          return acc;
        }, []);
  
        res.json(formularios);
      }
    );
  });
  
  
  



module.exports=router;