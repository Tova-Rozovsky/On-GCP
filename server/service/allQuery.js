import 'dotenv/config';

function getAllQuery(tableName) {
    const query = `SELECT * FROM ${process.env.DB_NAME}.${tableName}`;
    return query;
}


function executeInsertQuery(tableName, data) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = new Array(values.length).fill('?').join(', ');
    const query = `INSERT INTO ${process.env.DB_NAME}.${tableName} (${columns}) VALUES (${placeholders})`;
    return { query, values };
}

function getJoinTablesQuery(tableName1, tableName2, tableName3, statusColumn = 'requestStatus', statusValue = 'המתנה') {
    const today = new Date().toISOString().split('T')[0]; // קבל את התאריך הנוכחי
    const query = `
    SELECT DISTINCT *
    FROM ${process.env.DB_NAME}.${tableName1}
    NATURAL JOIN ${process.env.DB_NAME}.${tableName2}
    NATURAL JOIN ${process.env.DB_NAME}.${tableName3}
    WHERE ${statusColumn} = '${statusValue}'
    AND DATE(requestDate) = '${today}';
    `;
    return query;
}



function getJoinTwoTablesQuery(tableName1, tableName2) {
    const query = ` SELECT DISTINCT *
FROM ${process.env.DB_NAME}.${tableName1} NATURAL JOIN ${process.env.DB_NAME}.${tableName2}`;
    return query;
}

function getByIdQuery(tableName) {
    const query = `SELECT * FROM ${process.env.DB_NAME}.${tableName} WHERE userId=?`;
    return query;
}

function getByParameterQuery(tableName, conditions) {
    const query = `SELECT * FROM ${process.env.DB_NAME}.${tableName} WHERE ${conditions}`;
    return query;
}

function updateQuery(tableName, details, type) {
    const query = `UPDATE ${process.env.DB_NAME}.${tableName} SET ${details} WHERE ${type}=?`;
    return query;
}

function deleteQuery(tableName) {
    const query = `DELETE from ${process.env.DB_NAME}.${tableName} WHERE userId=?`;
    return query;
}

const addQuery = (table,columns) => {
    const columnsNames=Object.keys(columns);
    const query = `INSERT INTO nodeproject.${table} (${columnsNames.map((column)=>column)}) VALUES (${columnsNames.map((column)=>'?')})`;
    return query
}
export { addQuery,getAllQuery, getByIdQuery, getByParameterQuery, updateQuery, deleteQuery, getJoinTablesQuery,getJoinTwoTablesQuery,executeInsertQuery}
