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

export const addNewCharacters = async (dataCharacter) => {
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
            
            const resposta = await fetch('http://localhost:3000/addNewCharacter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataCharacter)
            });
    
            if (resposta.ok) {
                alert('Personagem adicionado ao banco de dados.');
            } else {
                alert('Erro ao adicionar o personagem ao banco de dados.');
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

} 