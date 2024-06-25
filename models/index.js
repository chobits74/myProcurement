const sequelize=require("../util/db"); 
const Activity=require("../models/activityModel");
const Resource = require("../models/resourceModel"); 

Activity.hasMany(Resource,{foreignKey:'activityId'}); 
Resource.belongsTo(Activity,{foreignKey:'activityId'});

sequelize.sync({force:true}).then(result=>{
    console.log(result);

}).catch((err)=>{
    console.log(err);
})

module.exports={Activity,Resource, sequelize}; 
