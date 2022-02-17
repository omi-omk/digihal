var dbProps = require("./db_properties");
var mysql = require("mysql");

module.exports = {
    getConnection: () =>{
    return mysql.createConnection({
        host:dbProps.host,
        user:dbProps.user,
        password:dbProps.password,
        database:dbProps.dbName
    });
}
}