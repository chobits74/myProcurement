const Sequelize = require("sequelize");
const sequelize = require("../util/db");


const Activity = sequelize.define('activity', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }, 
    activity:{
        type: Sequelize.STRING, 
        allowNull:false,
    }, 
    date:{ 
        type: Sequelize.DATEONLY, 
        allowNull:true,
    }, 
    duration:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    location:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    pic:{
        type: Sequelize.STRING,
        allowNull:false,
    },
});

module.exports=Activity; 