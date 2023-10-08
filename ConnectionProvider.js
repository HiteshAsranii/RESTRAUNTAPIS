const sql = require('mssql');

const config = {
    user: 'Hitesh',
    password: 'Hitesh@123',
    server: 'HITESH',
    database: 'Restraunt',
    options: {
        encrypt: false //in case of encryption true. 
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
    sql,
    poolPromise
};
