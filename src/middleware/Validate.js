import Joi from 'joi';

export function validateUser(user, key) {
    const schema = Joi.object({
        email: (key === 1) ? Joi.string().required().email() : Joi.string().optional(),
        firstname: (key === 1) ? Joi.string().required() : Joi.string().optional(),
        lastname: (key === 1) ? Joi.string().required() : Joi.string().optional(),
        phone: (key === 1) ? Joi.number().required() : Joi.number().optional(),
        password: (key === 1) ? Joi.string().required() : Joi.string().optional(),
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

export function validateOrder(order, key) {
    const schema = Joi.object({
        address: Joi.string().required().max(200),
        amount: Joi.number().required(),
        phone: Joi.number().required(),
        comments: Joi.string().max(255).optional().allow(''),
        data: Joi.array().items(Joi.object()).required(),
        type: Joi.string().optional(),
        id: Joi.number().optional().allow('')
    });
    return schema.validate(order);
}

export function validateType(type) {
    const schema = Joi.object({
        name: Joi.string().required(),
        id: Joi.number().optional().allow('')
    });
    return schema.validate(type);
}

export function validateProduct(product, key) {
    const schema = Joi.object({
        name: (key === 1) ? Joi.string().required().max(200) : Joi.string().optional().max(200),
        description: Joi.string().optional().allow(''),
        unit: Joi.string().optional().allow(''),
        price: Joi.number().optional().allow(''),
        sale_price: (key === 1) ? Joi.number().required() : Joi.number().optional(),
        quantity: Joi.number().optional().allow(''),
        discount: Joi.number().optional().allow(''),
        category_id: (key ===1 ) ? Joi.number().required() : Joi.number().optional()
    });
    return schema.validate(product);
}

export function validateCategory(category, key) {
    const schema = Joi.object({
        name: (key === 1) ? Joi.string().required().max(100) : Joi.string().optional(),
        type: (key === 1) ? Joi.number().required() : Joi.number().optional(),
        id: Joi.number().optional().allow('')
    });
    return schema.validate(category);
}


export function validatePassword(password) {
    const schema = Joi.object({
        old_password: Joi.string().required().max(200).min(6),
        new_password: Joi.string().required().max(200).min(6),
    });
    return schema.validate(password);
}