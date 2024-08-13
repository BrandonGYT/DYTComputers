const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('./repository/repoPokemones');
const app = express();
const port = 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/Pokemones', async (req, res) => {
  try {
    let PokemonesList = await db.findAll();
    res.status(200).json(PokemonesList);
  } catch (error) {
    console.error("Error al obtener la lista de pokemones:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

const NombreValidator = () => body('Nombre', 'Este campo es obligatorio').trim().notEmpty();
const TipoValidator = () => body('Tipo', 'Este campo es obligatorio').trim().notEmpty();
const HabilidadesValidator = () => body('Habilidades', 'Este campo es obligatorio').trim().notEmpty();
const MovimientosValidator = () => body('Movimientos', 'Este campo es obligatorio').trim().notEmpty();

app.post('/pokemones',NombreValidator(),TipoValidator(),HabilidadesValidator(),MovimientosValidator(),
async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()){
    let insertData = db.insert(req.body)
    res.status(201).json({message:"Pokemon Creado Exitosamente"})
  } else {
    res.status(400).json({error: result.array()});
  }
})



app.get('/Pokemones/:id', async (req, res) => {
  try {
    let pokemon = await db.findById(req.params.id); // Usar req.params.id en lugar de req.params.pokemonId
    if (pokemon) {
      res.status(200).json(pokemon);
    } else {
      res.status(404).json({ message: "Pokémon no encontrado" });
    }
  } catch (error) {
    console.error("Error al buscar el Pokémon:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.delete('/Pokemones/:id', async (req, res) => {
  try {
    let deleteResult = await db.delete(req.params.id); // Usa req.params.id para identificar el Pokémon a eliminar
    if (deleteResult) {
      res.status(200).json({ message: "Pokémon eliminado exitosamente" });
    } else {
      res.status(404).json({ message: "Pokémon no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el Pokémon:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.listen(port, () => {
  console.log(`Aplicación de ejemplo escuchando en el puerto ${port}`);
});
