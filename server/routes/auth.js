const router = require('express').Router();
const User = require('../model/User');
const {registerValidation,loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/register', async (req,res)=>{
    console.log(1);
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message); 
    console.log(2);
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");
    console.log(3);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        role:req.body.role
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is not found');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid Password');

    const token = jwt.sign({ _id: user.id, _name: user.name,_role:user.role }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Logged in successfully', token });
});

router.get('logout', (req,res)=>{
    res.status(200).json({ message: 'Logout in successfully'});
})



module.exports = router;  