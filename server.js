const express = require('express')
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body
const person = require('./models/person');
const MenuItem = require('./models/MenuItem');

app.get('/', function (req, res){
 res.send('welcome to my hotel.......how can i help u sir.')
 })

//post route t add a person
app.post('/person', async(req,res)=>{
  try{
    const data = req.body//assuming the req body contains the person data

    //create new person document using the mongoose model
    const newPerson = new person(data);

    //save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response); 
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Serve Error'});
  }
 })
 //get methord to get the person
 app.get('/person', async(req, res)=>{
  try{
    const data = await person.find();
    console.log('data fetched');
    res.status(200).json(data);
  } 
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Serve Error'});

  }
 })

 //post route t add a person
app.post('/Menu', async(req,res)=>{
  try{    const data = req.body
    const newMenu = new MenuItem(data);
 const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response); 
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Serve Error'});   

   
  }
 })

  //get methord to get the MenuItems
  app.get('/Menu', async(req, res)=>{
    try{
      const data = await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
    } 
      catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Serve Error'});
  
    }
   })
   app.get('/person/:worktype', async(req, res)=>{
    try{
      const workType = req.params.worktype;//to extract the work type from the uml parameter
      if(workType =='chef'|| workType == 'manager'|| workType=='waiter'){
        const response = await person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response); 
      }else{
        res.status(404).json({error: 'Invalid work type'});
      }
    }
      catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Serve Error'}); 
  
    
       
      }
     })
     //import the router files
     const personRoutes = require('./routes/personRoutes');
     const MenuItemRoutes = require('./routes/MenuItemRoutes');

     //use the routers
     app.use('./person', personRoutes);
     app.use('./Menu', MenuItemRoutes);
  

app.listen(3001, ()=>{
  console.log('listening on port 3001');
})