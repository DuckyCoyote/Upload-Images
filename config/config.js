const USER = encodeURIComponent('root');
const PASSWORD = encodeURIComponent('1234');
const URI = `mysql://${USER}:${PASSWORD}@localhost:3306/archivos_prueba`;

module.exports = {
  development: {
    url: URI,
    dialect: 'mysql',    
  }
}