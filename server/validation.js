const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = {
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        role: Joi.string()
            .required()
        
    };
    return Joi.object(schema).validate(data);
};

const loginValidation = data => {
    const schema2 = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.object(schema2).validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
