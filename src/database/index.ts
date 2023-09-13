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
        console.log(res.rows)
        await client.end()
    } catch (error) {
        console.log(error)
    }
}

export const setCharacters = async () => {
    // try {
    //     const client = new pg.Client({
    //         user: process.env.PGUSER,
    //         host: process.env.PGHOST,
    //         database: process.env.PGDATABASE,
    //         password: process.env.PGPASSWORD,
    //         port: process.env.PGPORT
    //     })
 
    //     await client.connect()
    //     const res = await client.query('SELECT * FROM characters')
    //     console.log(res.rows)
    //     await client.end()
    // } catch (error) {
    //     console.log(error)
    // }

    const response = await fetch('https://rickandmortyapi.com/api/character')
    const characters = response.json()
    return(characters)

}
 
