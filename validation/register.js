const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports= function validateInputRegisterData(data){
let errors={};
    data.name= isEmpty(data.name)?"":data.name;
    data.email= isEmpty(data.email)?"":data.email;
    data.password= isEmpty(data.password)?"":data.password;

    if(Validator.isEmpty(data.name))
    {
        errors.name= "Name field is required";
    }

    if(Validator.isEmpty(data.email))
    {
        errors.email="Email field is required";
    }
    else if(!Validator.isEmail(data.email))
    {
        errors.email="Email is invalid";
    }

    if(Validator.isEmpty(data.password))
    {
        errors.password= "Password field is required";
    }
    if(!Validator.isLength(data.password,{min:6,max:25}))
    {
        errors.password="Password must be atleast 6 characters and atmost 25 characters";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};