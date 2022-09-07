const express = require('express');
const Region = require('../models/region');

const router = new express();

router.post('/region', async(req, res) => {

    const alreadyExist = await Region.findOne({ regionname: req.body.region });
    if (alreadyExist)
        return res.status(400).send({ message: "Region already exist!" });

    const region = await new Region({
        regionname: req.body.region,
        capital: req.body.capital,
        population: req.body.population
    });
    try {
        await region.save();
        res.status(200).send({
            message: "Record saved successfully!",
            data: region
        });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Get all region
router.get('/', async(req, res) => {
    try {
        const region = await Region.find();
        res.send(region);
    } catch (err) {
        res.status(404).send(err);
    }
});

//Get region by ID
router.get("/region/:id", async(req, res) => {

    try {
        const region = await Region.findById(req.params.id);
        if (!region) {
            return res.status(404).send();
        }
        res.status(200).send(region);
    } catch (e) {
        res.status(500).send(e);
    }
});

//Update region
router.patch('/region/:id', async(req, res) => {
    try {
        const region = await Region.findById(req.params.id);

        region.regionname = req.body.region;
        region.capital = req.body.capital;
        region.population = req.body.population;

        await region.save();
        res.status(200).send({
            message: "Record updated sucessfully!",
            data: region
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error!" });
    }
});

//Delete region
router.delete('/region/:id', async(req, res) => {
    try {
        const region = await Region.findByIdAndDelete(req.params.id);
        if (!region) {
            return res.status(404).send();
        }
        await res.send(region);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error!" });
    }
});

module.exports = router;