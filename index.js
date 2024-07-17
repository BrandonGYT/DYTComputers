const express = require('express')
const { body, validationResult} = require('express-validator')
const db = require('./repository/repoFile')
const app = express();
const port = 3000; 

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola, mundo!');
});

app.get('/pokemones', async(req, res) => {
    let pokemonesList = await db.findAll()
    res.status(200).json(pokemonesList)
  })
  
  const nameValidator = () => body('name','This Field is Required').trim().notEmpty()
  const typeValidator = () => body('type').trim().notEmpty()

  app.post('/pokemones', nameValidator(), typeValidator, async (req, res) => {
    const result = validationResult(req);
    if (result,isEmpty()){
      let insertData = await db.insert(req,body)
      res,status(201),json({message: 'ok'})
    }
    res.status(400),json({errors: result.array() });
  })

  app.get('/pokemones/:pokemonesId', async (req, res) => {
    let pokemones = await db.findById(req.params.pokemonesId)
    if (pokemones) {
      res.status(200).json(pokemones)
    } else {
      res.status(404).json({message: "Pokemon Not Found"})
    }
  })

app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
});

//Error 400
//400 Bad Request: algo ha ido mal con la petición. 
//Si recibes este error, prueba a refrescar la página o actualizar tu navegador.