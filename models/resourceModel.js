const Sequelize = require("sequelize");
const sequelize = require("../util/db");


const Resource = sequelize.define('recource', {
    resId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }, 
    name:{
        type: Sequelize.STRING, 
        allowNull:false,
    }, 
    rateQuality:{
        type: Sequelize.INTEGER,
        allowNull:true,
        defaultValue: 0,
    },
    rateDelivery:{
        type: Sequelize.INTEGER,
        allowNull:true,
        defaultValue: 0,
    },
    rateSupport:{
        type: Sequelize.INTEGER,
        allowNull:true,
        defaultValue: 0,
    },
    amount:{
        type: Sequelize.FLOAT,
        allowNull:true,
    },
});
module.exports=Resource; 