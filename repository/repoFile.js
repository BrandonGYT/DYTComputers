
const dataBase = require("./db.json");
const mapDataBase = new Map(Object.entries(dataBase));
module.exports = Object.freeze({
  findById: (id) => mapDataBase.get(id),
  insert: (pokemones) => {
    // Logica para Manejar el ID
    return mapDataBase.set(pokemones.id, pokemones)
  },
  findAll: () => Array.from(mapDataBase.values()),
  removeById: (id) => mapDataBase.delete(id),
  update: (updatedpokemones) => {
    if (!mapDataBase.has(updatedpokemones.id)) throw new Error('user not found');
    mapDataBase.set(updatedpokemones.id, { ...mapDataBase.get(updatedpokemones.id), ...updatedpokemones });
  },
});
