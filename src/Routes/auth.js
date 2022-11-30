const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

// schema imports
// const userSchema = require('../Models/userSchema') //importing the userSchema file

router.post('/signup', [
    check("email","Please provide a valid email!").isEmail(),
    check("password","Password should be greater than 3characters.").isLength({min: 3})
], async (req, res) => {
    // const user = req.body
    const user = {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    }

    // validate user input
    const errors = validationResult(req) //validationResult method from express-validator does the validation
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    console.log("Validation passed!!");

    // Validate if user already exists
    // userSchema.find({email:req.body.email})
    // .then(resp =>{
    //     if (resp.length != 0) {
    //         return res.json({
    //             data:[],
    //             success:false,
    //             msg: "User email already exists"
    //         })
    //     } else {
    //         userSchema.create(users)
    //         return res.json({
    //             data:[],
    //             success:true,
    //             msg: "Succesfull signup"
    //         })
    //     }
    // })

    // userSchema.isEmailAlreadyInUse()
    let usr = userSchema.find(()=>{
        return usr.email === email.req.email
       
    })
    // if (usr) {
    //     res.status(400).json(
    //         {
    //             "errors": [
    //                 {
    //                     "msg": "User already exists!"
    //                 }
    //             ]
    //         } 
    //     )
       
    // }
    // else {
        
    // }
    const userInfo = new userSchema(user)
    try {
        await userInfo.save()
        return res.status(201).send(userInfo)
    } catch (error) {
        // res.status(400).send(error)
        console.log(error);
    }
    
})

module.exports = router //exporting the router file