import mysql from 'mysql2/promise';
import 'dotenv/config'


async function executeQuery(query, params){
    console.log("The query: "+query)
    console.log("The query parameters: "+params)
    let results;
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: process.env.DB_NAME,
        password: process.env.PASSWORD
    });

    try {
        [results] = await connection.execute(query,params);
        console.log(results)

    } catch (err) {
        console.log(err);
        throw err
    }
    finally {
        connection.end();
    }
    return results;
}

export{
    executeQuery
}