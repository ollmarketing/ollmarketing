const joi = require('joi');

module.exports = {
    
    isIdValid: (id) => {
        return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+ \d)/i.test(id);
    },

    validate: (schema) => {
        return (req, res, next) => {
            const result = joi.validate(req.body, schema);

            if (result.error) {
                return res.status(400).json({error: "validate error"});
            }

            if (!req.value) {
                req.value = {};
            }

            req.value['body'] = result.value;

            next();
        }
    },
    
    schemas: {
        emptySchema: joi.object().keys(),

        signUpSchema: joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required(),
            fullName: joi.string().required(),
        }),
    },
}