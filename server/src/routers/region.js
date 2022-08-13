const express = require('express');
const Region = require('../models/region');

const router = new express();

router.post('/region', async(req, res) => {
    const region = await new Region({
        regionname: req.body.region,
        districtname: req.body.district
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
    //const region = await Region.distinct("regionname", { regionname: "Upper West" });
    //console.log(region);
    try {
        const region = await Region.distinct("regionname", {});
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