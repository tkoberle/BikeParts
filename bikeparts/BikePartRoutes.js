const express = require('express')
const router = express.Router();
const Joi = require('joi');

const bikeParts = [
    {id:1,make:'shimano',part:'derailleur',model:'xt',year:'2018'},
    {id:2,make:'ritchey',part:'headset',model:'wcs logic threadless',year:'2018'},
    {id:3,make:'race face',part:'crankset',model:'turbine',year:'2018'},
    {id:4,make:'dt swiss',part:'wheel',model:'xm 1501 spline one',year:'2018'},
]

bikeParts.forEach(part => {
    const {error} = validateBikePart(part);
    if(error)
    {
        console.log(`Invalid part ${JSON.stringify(part)}. ${error.message}`)
    }
});

/**
 * @swagger
 * /bikeparts:
 *  get:
 *      description: Get all bike parts in the catalog
 */
router.get('/',(req,res) => 
{
    res.send(bikeParts);
})

/**
 * @swagger
 * /bikeparts:
 *  get:
 *      description: Get bike part corresponding to a provided ID
 *  produces:
 *       - application/json
 *  parameters:
 *       - name: id
 *         description: id of the bike part to retrieve
 *         in: formData
 *         required: true
 *         type: number
 */
router.get('/:id',(req,res) => {
    console.log(`Searching for part id ${req.params.id}`);
    const part = bikeParts.find(part => part.id === parseInt(req.params.id));
    console.log(`Found part ${part}`);
    res.send(part);
})

/**
 * @swagger
 * /bikeparts:
 *  put:
 *     description: Update the bike part for the provided ID
 *  produces:
 *       - application/json
 *  parameters:
 *       - name: id
 *         description: id of the bike part to update
 *         in: formData
 *         required: true
 *         type: number
 */
router.put('/:id',(req,res) => {
    const {error} = validateBikePart(req.body);
    if(error){
        return res.status(440).send(error.message);
    }
    
    console.log(`Searching for part id ${req.params.id}`);
    const part = bikeParts.find(part => part.id === parseInt(req.params.id));

    if(!part){
        return res.status(404).send(`Cannot find bikewith id ${req.params.id}`);
    }

    part.make = req.body.make;
    part.part = req.body.part;
    part.model = req.body.model;
    part.year = req.body.year;

    res.send(part);
})

/**
 * @swagger
 * /bikeparts:
 *  delete:
 *     description: Delete the bike part for the provided ID
 *  produces:
 *       - application/json
 *  parameters:
 *       - name: id
 *         description: id of the bike part to delete
 *         in: formData
 *         required: true
 *         type: number
 */
router.delete('//:id',(req,res) => {
    console.log(`Searching for part id ${req.params.id}`);
    const part = bikeParts.find(part => part.id === parseInt(req.params.id));

    if(!part){
        return res.status(404).send(`Cannot find part with id ${req.params.id}`);
    }
    const index = bikeParts.indexOf(part);
    console.log(`Removing index ${index} from collection`)
    
    bikeParts.splice(index,1);
    res.send(part);
})

function validateBikePart(bikePartBody)
{
    const bikePartSchema = 
    {
        id:Joi.number().required(),
        make:Joi.string().min(3).required(),
        part:Joi.string().min(3).required(),
        model:Joi.string().min(2).required(),
        year:Joi.string().min(3).required()           
    };

    return Joi.validate(bikePartBody,bikePartSchema);
}

module.exports = router;