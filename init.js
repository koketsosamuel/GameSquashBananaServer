const query = require("./util/query")
const fs = require("fs")

let q1 = fs.readFileSync("./queries/1_Users.sql", "utf-8")

let b =  async () => {

    let g =  query.conn()
    g.query(q1, (err, res, fi) => {
        console.log(err, res)
    })
    g.end()
    

}

b()
