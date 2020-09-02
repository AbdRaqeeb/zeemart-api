import {Category, Type, Product} from '../../../database/models';
import {validateCategory} from '../../../middleware/Validate';
import {uploadImage} from '../../../helpers/upload';

/**
 * @class Categories
 * @desc Controller for categories
 **/

class CategoryController {
    /**
     * @static
     * @desc    Add a category
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {object} json category object
     **/
    static async addCategory(req, res) {
        const {error} = validateCategory(req.body, 1);
        if (error) return res.status(400).json(error.details[0].message);

        const {name, type } = req.body;
        try {
            const check = await Category.findOne({
                where: {
                    name
                }
            });

            if (check) return res.status(400).json({
                error: true,
                msg: 'Category already exist'
            });

            if (!req.files) return res.status(400).json({
                error: true,
                msg: 'Please select an image'
            });

            const image = await uploadImage(req.files.image);

            const category_file = await Category.create({
                name,
                image,
                type_id: type
            });

            const category = await Category.findByPk(category_file.id, {
                include: Type
            })

            return res.status(200).json({
                error: false,
                msg: 'Category added successfully',
                category
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     * @static
     * @desc    Get all categories
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {object} json category object
     **/
    static async getCategories(req, res) {
        try {
            const categories = await Category.findAll({
                include: Type
            });

            if (!categories) return res.status(404).json({
                error: true,
                msg: 'No category found'
            });

            return res.status(200).json({
                error: false,
                categories
            })

        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     * @static
     * @desc    Get a category
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {object} json category object
     **/
    static async getCategory(req, res) {
        const {id} = req.params;
        try {
            const category = await Category.findByPk(id, {
                include: Product
            });

            if (!category) return res.status(404).json({
                error: true,
                msg: 'Category not found'
            });

            return res.status(200).json({
                error: false,
                category
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     * @static
     * @desc    Update a category
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {object} json category object
     **/
    static async updateCategory(req, res) {
        const {error} = validateCategory(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const { id } = req.params;
        const {name, type} = req.body;
        try {
            const category = await Category.findByPk(id);

            if (!category) return res.status(404).json({
                error: true,
                msg: 'Category not found'
            });

            const image = (req.files) ? await uploadImage(req.files.image) : category.image;
            const category_name = (name) ? name : category.name;


            const updated = await category.update({name: category_name, image, type});

            if (!updated) return res.status(400).json({
                error: true,
                msg: 'Error on category update'
            });

            const updatedCategory = await Category.findByPk(id, {include: [
                {
                    model: Type
                }
            ]})


            return res.status(200).json({
                error: false,
                updatedCategory,
                msg: 'Category updated succesfully'
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     * @static
     * @desc   Delete a category
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {object} json category object
     **/
    static async deleteCategory(req, res) {
        const {id} = req.params;
        try {
            const category = await Category.findByPk(id);

            if (!category) return res.status(404).json({
                error: true,
                msg: 'Category not found'
            });

            await category.destroy({force: true});

            return res.status(200).json({
                error: false,
                msg: 'Category deleted successfully'
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }
}

export default CategoryController;