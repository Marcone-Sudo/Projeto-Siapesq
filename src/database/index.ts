import pg from "pg"

export const getCharacters = async () => {
    try {
        const client = new pg.Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
 
        await client.connect()
        const res = await client.query('SELECT * FROM characters')
        await client.end()
        return(res.rows)
    } catch (error) {
        console.log(error)
    }
}

// SHOW
export const setCharacters = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const characters = await response.json();

    try {
        const client = new pg.Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        });

        await client.connect();

        try {
            await client.query('BEGIN');

            //const res = await client.query(`CREATE TABLE IF NOT EXISTS characters (id SERIAL PRIMARY KEY, name TEXT NOT NULL, image TEXT, species TEXT, gender TEXT, origin TEXT, status TEXT, type TEXT, created TIMESTAMP)`);


            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS characters (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                image TEXT,
                species TEXT,
                gender TEXT,
                origin TEXT,
                status TEXT,
                type TEXT,
                created TIMESTAMP
            )
        `;

const res = await client.query(createTableQuery);


            for (const character of characters.results) {

                // Verifica se o personagem já existe no banco de dados
                const existingCharacter = await client.query(
                    "SELECT id FROM characters WHERE id = $1",
                    [character.id]
                );

                if (existingCharacter.rows.length === 0) {
                    const res = await client.query(
                        "INSERT INTO characters (id, name, image, species, gender, origin, status, type, created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
                        [character.id, character.name, character.image, character.species, character.gender, character.origin.name, character.status, character.type, character.created]
                    );
                    console.log(res);
                } else {
                    console.log(`O personagem com ID ${character.id} já existe no banco de dados.`);
                }
            }

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            await client.end();
        }
    } catch (error) {
        console.error(error);
    }

    return characters.results;
};

// DELETE
export const deleteCharacters = async (id: number) => {
    try {
        const client = new pg.Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        });

        await client.connect();

        let queryResult
        try {
            await client.query('BEGIN');
            const query = 'DELETE FROM characters WHERE id = $1';
            const values = [id];
            const result = await client.query(query, values);

            if (result.rowCount === 1) {
                queryResult = `O personagem com o ID ${id} foi excluído com sucesso.`
            } else {
                queryResult = `Nenhum personagem encontrado com o ID ${id}. Nenhum registro foi excluído.`
            }

            await client.query('COMMIT');
            
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            await client.end();
            return(queryResult)
        }
    } catch (error) {
        console.error(error);
    }

} 

//ADD NEW CHARACTER
export const addNewCharacters = async (character) => {

    try {
        const client = new pg.Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        });

        await client.connect();

        let queryResult

        try {
            await client.query('BEGIN');
            const result = await client.query(
                "INSERT INTO characters (name, image, species, gender, origin, status, type, created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                [character.name, character.image, character.species, character.gender, character.origin.name, character.status, character.type, character.created]
            );

            if (result.rowCount === 1) {
                queryResult = `O personagem foi foi adicionado com sucesso.`
            } else {
                queryResult = `Erro ao cadastras, tente novamente.`
            }

            await client.query('COMMIT');
            
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            await client.end();
            return(queryResult)
        }
    } catch (error) {
        console.error(error);
    }
} 

export const updateCharacters = async (character) => {

    try {
        const client = new pg.Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        });

        await client.connect();

        let queryResult

        try {
            await client.query('BEGIN');
            const result = await client.query(
                "UPDATE characters SET name = $2, image = $3, species = $4, gender = $5, origin = $6, status = $7, type = $8, created = $9 WHERE id = $1",
                [character.id, character.name, character.image, character.species, character.gender, character.origin.name, character.status, character.type, character.created]
              );
              console.log(result)

            if (result.rowCount === 1) {
                queryResult = `O personagem foi foi alterado com sucesso.`
            } else {
                queryResult = `Erro ao alterar, tente novamente.`
            }

            await client.query('COMMIT');
            
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            await client.end();
            return(queryResult)
        }
    } catch (error) {
        console.error(error);
    }
} 