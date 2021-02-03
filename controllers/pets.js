const Pets = require('../models/pets');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.create = (req, res) => {
    
    const pets = new Pets(req.body)

    pets.save( (err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.send({data});
    })
}

exports.remove = (req, res) => {

    let pets = req.pets;
    
    pets.remove( (err, deletedPets) => {
        if(err){
            return res.status(400).json({ error: errorHandler(err)  })
        }

        res.json({
            message: 'Pets deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    Pets.find().exec( (err, data) =>{
        if(err){
            return res.status(400).json({ error: errorHandler(err)  })
        }

        res.json(data);
    })
}

exports.petsById = (req, res, next, id) => {
    Pets.findById(id)
    .exec( (err, pets) =>{
        if(err || !pets){
            return res.status(400).json({
                error: "Pets not found"
            })
        }
        req.pets = pets;
        next();
    })
}