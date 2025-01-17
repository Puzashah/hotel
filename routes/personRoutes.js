const express = require('express');
const router = express.Router();
const person = require('./../models/person');

router.get('/', function (req, res){
    res.send('welcome to my hotel.......how can i help u sir.')
    })

//post route t add a person
router.post('/', async(req,res)=>{
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
   router.get('/', async(req, res)=>{
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
   router.get('/:worktype', async(req, res)=>{
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
     router.put('/:id', async(req,res)=>{
      try{
        const personId = req.params.id;//to extract the id from URL PARAMETER
      const updatedPersonData = req.body; //update data for th person

      const response = await person.findByIdAndUpdate(personId, updatedPersonData,{
        new: true, //return the update ocument
        runvalidators: true, //run mangoose validation

      })
      if (!response){
        return res.status(404).json({error: 'Person not found'});
      }
      console.log('data updated');
      res.status(200).json(response);

    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Serve Error'});   
  
     
    }
   })

module.exports = router;