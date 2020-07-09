const express = require('express');
const router = express.Router();

let Joi = require('joi');
   
const bikes = [
    {id:1,model:'Zaskar',make:'GT',year:'1998',type:'mtb'},
    {id:2,model:'Stumpjumper',make:'S-Works',year:'2008',type:'mtb'},
    {id:3,model:'Cross Pro',make:'Cube',year:'2017',type:'cross'}
];

/****************************************
 *              GETS
 */
router.get('/',(req,res) => {
    res.send(bikes);
});

router.get('/:id',(req,res) => {
    const bike = bikes.find(bike => bike.id===parseInt(req.params.id));

    if(bike)
        res.send(bike);
    else
        res.status(404).send(`Bike with id ${req.params.id} was not found`);
});

/****************************************
 *              POSTS
 */

router.post('/',(req,res) => {
    const {error} = ValidateBike(req.body);
    if(error){
        // let msg = `Body of the request has errors: ${validationResult.error.details[0].message}`;
        let msg = `Body of the request has errors: ${error}`;
        console.log(JSON.stringify(msg));
        return res.status(400).send(msg);
    }

    const newBike = {
        id:bikes.length+1,
        model:req.body.model,
        make:req.body.make,
        year:req.body.yeah,
        type:req.body.type};
    
    bikes.push(newBike);
    res.send(newBike);
    console.log('Added new bike '+JSON.stringify(newBike));
});

/****************************************
 *              PUTS
 */

router.put('/:id',(req,res) => {
    const {error} = ValidateBike(req.body);
    if(error){
        return res.status(440).send(error.message);
    }
    
    console.log('Looking up bike with id = '+req.params.id);
    const bike = bikes.find(bike => bike.id===parseInt(req.params.id));
    if(!bike){
        return res.status(404).send('Unable to find bike with id = '+ req.params.id);
    }

    bike.make = req.body.make;
    bike.model = req.body.model;
    bike.year = req.body.year;
    bike.type = req.body.type;
    res.send(bike);
})

/****************************************
 *              DELETES
 */

router.delete('/:id',(req,res) => {
    const bike = bikes.find(bike => bike.id===parseInt(req.params.id));
    if(!bike){
        return res.status(404).send('Unable to find bike with id = '+ req.params.id);
    }

    const index = bikes.indexOf(bike);
    console.log(`Removing bike ${JSON.stringify(bike)} from index ${index}`)
    bikes.splice(index,1);

    res.send(bike);
})

function ValidateBike(bikeBody)
{
    const bikeSchema = {
        model: Joi.string().min(3).required(),
        make: Joi.string().min(3).required(),
        year: Joi.string().min(4).max(4).required(),
        type: Joi.string().min(3).required() 
    };

    return Joi.validate(bikeBody,bikeSchema);
}

module.exports = router;