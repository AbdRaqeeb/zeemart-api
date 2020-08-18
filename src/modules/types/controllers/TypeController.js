import {Type, Category} from '../../../database/models';
import {validateType} from '../../../middleware/Validate'

import db from '../../../database/models/index';

/**
 * @class   User controller
 * */
class TypeController {
    /***
     * @static
     * @desc    Create type
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {object}  object
     * @access  Private
     */
    static async addType(req, res) {
        const {error} = validateType(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const {name} = req.body;
        try {
            const check = await Type.findOne({
                where: {
                    name
                }
            });

            if (check) return res.status(400).json({
                error: true,
                msg: 'Type already exists'
            });

            const type = await Type.create({
                name
            });

            return res.status(201).json({
                error: false,
                type
            });
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    };

    /***
     * @static
     * @desc    Get all types
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {object}  object
     * @access  Private
     */
    static async getAllTypes(req, res) {
        try {
            const types = await Type.findAndCountAll();

            if (!types) return res.status(404).json({
                error: true,
                msg: 'Types not found'
            });

            return res.status(200).json({
                error: false,
                types
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /***
     * @static
     * @desc    Get one type
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {object} type object
     * @access  Private
     */
    static async getOneType(req, res) {
        try {
            const {id} = req.params;
            const type = await Type.findByPk(id, {
                include: Category
            });

            if (!type) return res.status(404).json({
                error: true,
                msg: 'Type not found'
            });

            return res.status(200).json({
                error: false,
                type
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error..')
        }
    }

    /***
     * @static
     * @desc    Update type
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {object}  object
     * @access  Private
     */
    static async updateType(req, res) {
        const {error} = validateType(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const {id} = req.params;
        try {
            const type = await Type.findByPk(id);

            if (!type) return res.status(404).json({
                error: true,
                msg: 'Type not found'
            });

            const updatedType = await type.update(req.body);

            return res.status(200).json({
                error: false,
                updatedType
            });

        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /***
     * @static
     * @desc    Delete type
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {object}  object
     * @access  Private
     */
    static async deleteType(req, res) {
        const {id} = req.params;
        try {
            const type = await Type.findByPk(id);

            if (!type) return res.status(404).json({
                error: true,
                msg: 'Type not found'
            });

            await type.destroy({force: true});

            return res.status(200).json({
                error: false,
                msg: 'Type deleted successfully'
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }
}

export default TypeController;