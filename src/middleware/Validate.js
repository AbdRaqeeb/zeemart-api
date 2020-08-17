import Joi from 'joi';

export function validateUser(user, key) {
    const schema = Joi.object({
        email: (key === 1) ? Joi.string().required().email() : null,
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        phone: Joi.number().required().min(11),
        password: (key === 1) ? Joi.string().required().min(6) : null,
        address: Joi.string().optional().allow(''),
        role: Joi.string().optional().allow('')
    });
    return schema.validate(user)
}

export function validateLogin(user) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    });
    return schema.validate(user)
}

export function validateOrder(order) {
    const schema = Joi.object({
        address: Joi.string().required().max(200),
        customer_id: Joi.number().required(),
        amount: Joi.number().required(),
        phone: Joi.number().required(),
        comments: Joi.string().max(255).optional().allow(''),
        data: Joi.array().items(Joi.object()).required()
    });
    return schema.validate(order);
}

export function validateType(type) {
    const schema = Joi.object({
        name: Joi.string().required()
    });
    return schema.validate(type);
}

export function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().required().max(200),
        description: Joi.string().optional().allow(''),
        unit: Joi.number().optional().allow(''),
        price: Joi.number().optional().allow(''),
        sale_price: Joi.number().required(),
        quantity: Joi.number().optional().allow(''),
        discount: Joi.number().optional().allow(''),
        image: Joi.any().meta({ swaggerType: 'file' } ).required().description('Image file')
    });
    return schema.validate(product);
}

export function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().required().max(100),
        image: Joi.any().meta({ swaggerType: 'file' }).required().description('Image file')
    });
    return schema.validate(category);
}
