const express = require('express');
const Region = require('../models/region');

const router = new express();

router.post('/region', async(req, res) => {

    const duplicateRegion = await Region.findOne({ regionname: req.body.region });
    if (duplicateRegion)
        return res.status(409).send({ message: "Region already exist!" });

    const region = await new Region({
        regionname: req.body.region,
        capital: req.body.capital
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

router.get('/', async(req, res) => {
    try {
        const region = await Region.find();
        res.send(region);
    } catch (err) {
        res.status(404).send(err);
    }
});
router.get('/district/:regionname', async(req, res) => {
    try {
        const region = await Region.find({ regionname: req.params.regionname });
        if (!region)
            return res.status(404).send();

        res.send(region);
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error!" });
    }

});

module.exports = router;