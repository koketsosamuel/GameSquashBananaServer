const mysql = require("mysql")
const databaseConf = require("../config/database")

module.exports = {
    query,
    insert,
    conn
}

function query(q, h, res = null) {


        let output = {
            err: false,
            res: null,
            fields: null
        }
    
        let output = {
            err: false,
            res: null,
            fields: null
        }
    
        let connection =  mysql.createConnection(databaseConf)
        connection.connect()
    
        connection.query(q, (err, res, fields) => {
           if(err) console.log(err.sqlMessage)
            output = {err, res, fields}
            return output
        })
    
        connection.query(q, h)
        //connection.clo
    

}

async function insert(table, columns, values, h, res = null) {

    let cols = JSON.stringify(columns)
    let vals = JSON.stringify(values)

    cols = await cols
            .replace("\"", "")
            .replace("[", "")
            .replace("]", "")

    vals = await vals
            .replace("[", "")
            .replace("]", "")

    

    let q = `INSERT INTO ${table} (${cols}, createdAt) VALUES (${vals}, SELECT CURDATE())`
    let res = await query(q, h)
    return res

}

function conn() {
    let connection = mysql.createConnection(databaseConf)
    connection.connect()
    return connection
}