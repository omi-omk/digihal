module.exports = {
  host:"digihal-db.cydpvtg1mc9v.ap-south-1.rds.amazonaws.com",
  user:"admin",
  password:"Omega7809",
  dbName:"digihal",
    dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};