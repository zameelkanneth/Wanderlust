const Joi=require("joi");

const reviewSchema=Joi.object({

    username:Joi.string().required(),
    comment:Joi.string().required(),
    rating:Joi.number().required().min(1).max(5)

})
module.exports=reviewSchema;