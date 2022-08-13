const express = require('express');
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

const router = new express.Router();

router.post('/user', async(req, res) => {
    // const { error } = validate(req.body);
    // if (error)
    //     return res.status(400).send({ message: error.details[0].message });

    const email = await User.findOne({ email: req.body.email });
    if (email)
        return res.status(409).send({ message: "User with given email already exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = await new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPassword
    });
    try {

        await user.save();
        res.send({
            message: "Record saved successfully!",
            data: user
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;