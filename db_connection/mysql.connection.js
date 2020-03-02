const mysql = require('mysql');

class MysqlDatabaseConnection {
    async getConnection() {
        return new Promise((resolve, reject) => {
            try {
                const options = {
                    connectionLimit : 10,
                    host: "localhost",
                    user: "root",
                    password: "",
                    database: "social_network"
                };
                const pool = mysql.createPool(options);
                pool.getConnection((err, connection) => {
                    if(err) {
                        const errMsg = {"messsage": JSON.stringify(err.message), "type": err.name}
                        return reject(errMsg);
                    } else {
                        console.log("DB connection established");
                        return resolve(connection);
                    }
                });
            } catch (error) {
                throw error;
            }
        });
    }

    async executeQuery(query, params) {
        return new Promise(async (resolve ,reject) => {
            try {
                const connection = await this.getConnection();
                connection.config.queryFormat = function (q, values) {
                    try {
                        if (!values) return q;
                        if (q.indexOf(':') === -1) {
                            return mysql.format(q, values);
                        }
                        const finalQuery = q.replace(/:(\w+)/g, (txt, key) => {
                            if (values.hasOwnProperty(key)) {
                                return this.escape(values[key]);
                            }
                            return txt;
                        });
                        return finalQuery;
                    } catch (_) {
                        return q;
                    }
                };
                connection.connect();
                connection.query(query, params, (error, data) => {
                    // console.log(connection.threadId);
                    connection.release();
                    if(error) {
                        const errMsg = {"messsage": JSON.stringify(error.message), "type": error.name}
                        return reject(errMsg);
                    } else {
                        if(data.length) return resolve(data);
                        return resolve(null);
                    }
                })  
            } catch (error) {
                return reject(error);
            }
        })
    }
}

module.exports = MysqlDatabaseConnection