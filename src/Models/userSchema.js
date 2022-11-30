const mongoose = require ('mongoose')
const schema = mongoose.Schema; //creating a schema object

const userSchema = new schema({
    username: {
        type:String,
        required: true,
        maxlength:32,
        trim:true
    },
    email: {
        type:String,
        required: true,
        trim:true,
        unique:true
    },
    password: {
        type:String,
        required: true
    },

    // confirmPassword: {
    //     type:String,
    //     required: true
    // },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Role"
    }]
})

// userSchema.statics.isThisEmailInUse = async function(email){
// const usr = await this.findOne({email})
// if (!email) {
//     // throw new Error("Invalid email")
//     console.log("Invalid email");
// }
// try {
//     if (usr) {
//         // return false
//         console.log("Email already exists");
//     }else{
//         return true
//     }
// } catch (error) {
//     console.log("error inside isThisEmailInUse method", error.message);
//     return false
// }

// }

const User = mongoose.model("Users", userSchema)
module.exports = User 