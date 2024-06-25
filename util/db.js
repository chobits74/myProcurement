const Sequelize = require('sequelize'); 


sequelize = new Sequelize('procdetails', 'root', 'root',{
    host: "localhost",
    dialect: 'mysql',
    
} );

module.exports = sequelize;