const query = require("../util/query")
const colsVals = require("../util/colsAndRows")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authConf = require("../config/auth")
const errMsg = require("../util/errorMsg")

module.exports = {

    register: (req, res) => {

        let user = req.body
        
        // hash password
        bcrypt.hash(user.pwd, authConf.saltRounds, (err, hash) => {

            if(err) return res.json({err})
            user.pwd = hash

            // get values and cols
            let cols = colsVals.getCols(user)
            let vals = colsVals.getVals(user)

            let q = `INSERT INTO Users(${cols}, isAdmin, emailVerified, createdAt) 
            VALUES (${vals},"N", "N", CURRENT_TIMESTAMP())`

            // make connection
            let conn = query.conn()

            // make query
            conn.query(q, (err, results, fields) => {
                if(err) {
                    
                    res.json({err: errMsg(err.sqlMessage)})

                } else {
                    res.json({results})
                }
            })

            // connection close
            conn.end()

        })

        

    },

    login: (req, res) => {

        let q = `
            SELECT * FROM Users
            WHERE email = "${req.body.email}"
        `

        // make connection
        let conn = query.conn()
        conn.query(q, (err, results, fields) => {
            
            if(err) {

                res.json({err: errMsg(err)})  
                
            } else if(results.length == 0) {
                    
                res.json({err: errMsg("Account not found")})

            } else {
                
                let user = results[0]

                // compare password with hash
                bcrypt.compare(req.body.pwd, user.pwd, (err, match) => {
                    if(err) {
                        res.json({err})
                    } else if(match) {
                        
                        // create and issue token
                        let token = jwt.sign({...user}, authConf.jwtKeyAuthKey, {expiresIn: "1h"})
                        res.json({token})

                    } else {
                        res.json({msg: "password incorrect"})
                    }
                })

            }
            
        })

        // close connection
        conn.end()

    },

    passResetLink: (req, res) => {

        let email = req.body.email

        let q = `
            SELECT * FROM Users
            WHERE email = "${req.body.email}"
        `

        //make connection
        let conn = query.conn()
        
        conn.query(q, (err, results, fields) => {
            if(err) {
                res.json({err})
            } else if(results.length == 0) {
                res.json({msg: "Email not found"})
            } else {
                let token = jwt.sign({...results[0]}, authConf.jwtKeyPwdResetKey)
                res.json({token})
            }
        })

        // close connection
        conn.end()

        

    },

    passReset: (req, res) => {

        let conn

        try {
            
            let token = req.params.token
            let user = jwt.verify(token, authConf.jwtKeyPwdResetKey)

            let q = `
            
                UPDATE Users
                SET pwd = "${req.body.pwd}", updatedAt = CURRENT_TIMESTAMP()
                WHERE email = "${user.email}"

            `

            conn = query.conn()
            conn.query(q, (err, results, fields) => {
                if(err) {
                    res.json({err})
                } else {
                    res.json({results, msg: "password reset was successful"})
                }
            })

            conn.end()

        } catch(err) {
            conn.end()
            res.json({err, msg: "Link expired, or incorrect link"})
        }

    }

    // emailVerifyLink: (req, res) => {

        

    // },

    // emailVerify: (req, res) => {

    // }

}