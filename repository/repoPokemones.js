const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: "db",
    user: "mariadb",
    password: "mariadb",
    database: "mariadb",
    connectionLimit: 5
});

async function asyncFunction() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT 1 as val");
        // rows: [ {val: 1}, meta: ... ]

        const res = await conn.query("INSERT INTO myTable (column1, column2) VALUES (?, ?)", [1, "mariadb"]);
        // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }

    } finally {
        if (conn) conn.release(); //release to pool
    }
}

module.exports = Object.freeze({
    findById: async (id) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM Pokemon WHERE id = ?", [id]);
            // rows: [ {id: 1, Nombre: 'Pikachu', Tipo: 'Electric', ...}, meta: ... ]
            if (rows.length > 0) {
                return rows[0];
            }
            return null;
        } catch (error) {
            console.error("Error al buscar Pokémon:", error);
            throw error;
        } finally {
            if (conn) conn.release(); //release to pool
        }
    },
    insert: async (Pokemon) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const res = await conn.query("INSERT INTO Pokemon (Nombre, Tipo, Habilidades, Movimientos) VALUES (?, ?, ?, ?)", 
                [Pokemon.Nombre, Pokemon.Tipo, Pokemon.Habilidades, Pokemon.Movimientos]);
            // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
            return { id: res.insertId, ...Pokemon };
        } catch (error) {
            console.error("Error al insertar Pokémon:", error);
            throw error;
        } finally {
            if (conn) conn.release(); //release to pool
        }
    },
    findAll: async () => {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM Pokemon");
            // rows: [ {id: 1, Nombre: 'Pikachu', Tipo: 'Electric', ...}, ... ]
            return rows;
        } catch (error) {
            console.error("Error al obtener la lista de Pokémon:", error);
            throw error;
        } finally {
            if (conn) conn.release(); //release to pool
        }
    },
    delete: async (id) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const result = await conn.query("DELETE FROM Pokemon WHERE id = ?", [id]);
            // result: { affectedRows: 1 }
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error al eliminar Pokémon:", error);
            throw error;
        } finally {
            if (conn) conn.release(); //release to pool
        }
    }
});
