CREATE TABLE IF NOT EXISTS Pokemon (
    Id INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Tipo VARCHAR(100) NOT NULL,
    Habilidades VARCHAR(100) NOT NULL,
    Movimientos VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id)
);

INSERT INTO Pokemon (Nombre, Tipo, Habilidades, Movimientos) VALUES

('Bulbasaur',   'Planta',       'Espesura, Clorofila',          'Placaje, Látigo Cepa, Hoja Afilada'),
('Charmander',  'Fuego',        'Mar Llamas, Poder Solar',      'Arañazo, Ascuas, Lanzallamas'),
('Squirtle',    'Agua',         'Torrente, Cura Lluvia',        'Placaje, Pistola Agua, Hidrobomba'),
('Pikachu',     'Eléctrico',    'Estática, Pararrayos',         'Ataque Rápido, Rayo, Placaje Eléctrico'),
('Jigglypuff',  'Normal',       'Gran Encanto, Competitivo',    'Destructor, Canto, Vozarrón'),
('Eevee',       'Normal',       'Fuga, Adaptable',              'Placaje, Ataque Rápido, Última Baza'),
('Magikarp',    'Agua',         'Nado Rápido, Cobardía',        'Salpicadura, Placaje, Azote'),
('Geodude',     'Roca',         'Cabeza Roca, Robustez',        'Placaje, Lanzarrocas, Terremoto'),
('Snorlax',     'Normal',       'Inmunidad, Grasa Gruesa',      'Placaje, Descanso, Golpe Cuerpo'),
('Dragonite',   'Dragón',       'Foco Interno, Multiescama',    'Furia Dragón, Danza Dragón, Enfado');
