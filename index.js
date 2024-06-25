const express = require("express"); 
const port=3000; 
const app = express(); 
//const sequelize  = require("./models");
const Activity=require("./models/activityModel");
const Resource=require("./models/resourceModel");
const session = require('express-session');
const flash = require('express-flash');
//const { where } = require("sequelize");
const { Op } = require("sequelize");
const { sequelize } = require("./models");

app.use(session({
  secret: 'mysecretkey',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs"); 

app.get("/", (req,res)=>{
  res.render('index'); 
})

//app.get("/activities", (req,res)=>{
  //res.render('listActivities'); 
//})

app.get("/registers", (req,res)=>{
  res.render("register");
})

app.get("/display", async (req,res)=>{
  const acts = await Activity.findAll();
  res.render("listActivities", {acts} );

})

app.post('/regs', (req, res)=>{
  const {activity, date, duration, location, pic}=req.body; 

  const act = new Activity({
    activity,
    date,
    duration,
    location,
    pic
  });
  act.save()
  .then(()=> {
    //res.send('user created'); 
     req.flash('success', 'Activity has been added successfully!');
     res.redirect('/display');
  }).catch((err)=>{
    res.status(500).send("error "+err.message); 
  });
});

app.get('/delete/:id', async (req, res)=> {
  const actId=req.params.id;

  try{
    await Activity.destroy({
    where: {
      id: actId
    }
  });
  req.flash('success', 'Activity has been deleted successfully!')
  res.redirect('/display');
  //res.status(204).send();
}catch(err){
        console.error('error deleting', err);
        res.status(500).send();
      }
 });

app.get('/updateAct/:id', async(req,res)=>{
  const actId=req.params.id;
  const act = await Activity.findByPk(actId);
  if(act){
    res.render("edit",{act});
  }else{
    res.status(404);
  }
});

 app.post('/updateAct/:id', async(req,res)=>{
  const actId = req.params.id; 
  const updates={
    activity: req.body.activity,
    date: req.body.date,
    duration: req.body.duration,
    location: req.body.location, 
    pic: req.body.pic
  };
  await Activity.update(updates,{
    where:{
      id: actId
    }
  }) ;
    res.redirect('/display'); 
    
});


app.get('/updateRes/:id', async(req,res)=>{
  const actId=req.params.id;
  const act = await Activity.findByPk(actId);
  //const resources =act.resources; 
  if(act){
    res.render("regOs",{act});
  }else{
    res.status(404);
  }
});



app.post('/updateRes/:id', (req, res) => {
  //const actId=Activity.activityId;
  //const activityId=req.params.id;
  //const activityId = actId;
 const { name, rateQuality, rateDelivery, rateSupport, amount,activityId } = req.body;
 //const { name, amount,activityId } = req.body;
  // Create a new Resource instance with the activityId
  const reso = Resource.create({
   
    name,
    rateQuality,
    rateDelivery,
    rateSupport,
    amount,
    activityId,
  });

  reso.then(() => {
    req.flash('success', 'Resources OS has been added successfully!');
    res.redirect('/display');
  }).catch((err) => {
    res.status(500).send("error " + err.message);
  });
});

app.get('/updateRate/:id', async(req,res)=>{
  const actId=req.params.id;
  const act = await Activity.findByPk(actId);
  //const resources =act.resources; 
  if(act){
    res.render("rateOs",{act});
  }else{
    res.status(404);
  }
});

app.post('/updateRate/:id', async(req, res) => {
  const actId = req.params.id; 
  const updates={
    rateQuality: req.body.quality,
    rateDelivery: req.body.delivery,
    rateSupport: req.body.support,
    
  };
  await Resource.update(updates,{
    where:{
      activityId: actId
    }
  }) ;
    res.redirect('/display'); 
    
});
  
 

app.use((req,res)=>{
  res.status(404).render('404'); 
})


app.listen(port, () => {
  console.log("Server started at http://localhost:${port}");
});