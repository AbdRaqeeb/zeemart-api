import {Product, Category} from '../../../database/models';
import { uploadImage } from '../../../helpers/upload';
import {validateProduct} from '../../../middleware/Validate';
import db from '../../../database/models/index';
import {getPagination, getPagingData} from '../../../middleware/Pagination';

const Op = db.Sequelize.Op;


/**
 * @class Products
 **/

class ProductController {
    /***
     * @static
     * @desc Add a product
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {object} json product object
     * @access Private
     * */
    static async addProduct(req, res) {
        const {error} = validateProduct(req.body, 1);
        if (error) return res.status(400).json(error.details[0].message);

        const {name, description, unit, price, sale_price, quantity, discount, category_id} = req.body;
        try {
            const check = await Product.findOne({
                where: {
                    name,
                    sale_price
                }
            });

            if (check) return res.status(400).json({
                error: true,
                msg: 'Product already exists'
            });

            if (!req.files) return res.status(400).json({
                error: true,
                msg: 'Please upload an image'
            });

            // Key 1 to upload image to product folder
            const image = await uploadImage(req.files.image, 1);

            const product = await Product.create({
                name,
                description,
                unit,
                price,
                sale_price,
                quantity,
                discount,
                image,
                category_id,
                admin_id: req.user.id
            });

            return res.status(201).json({
                error: false,
                product,
                msg: 'Product added successfully'
            })
        } catch (e) {
            console.error(e);
            res.status(500).send('Internal server error...');
        }
    }

    /**
     *@static
     * @desc  Get all products
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {object} json product object
     **/
    static async getProducts(req, res) {
        try {
            const products = await Product.findAll({
                include: Category
            });

            if (products.length === 0) return res.status(404).json({
                error: true,
                msg: 'No product found'
            });

            return res.status(200).json({
                error: false,
                products
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...');
        }
    }

    /**
     *@static
     * @desc  Get one product
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {object} json product object
     **/
    static async getOneProduct(req, res) {
        const {id} = req.params;
        try {
            const product = await Product.findByPk(id);

            if (!product) return res.status(404).json({
                error: true,
                msg: 'Product not found'
            });

            return res.status(200).json({
                error: false,
                product
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     *@static
     * @desc  Update a product
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {object} json product object
     **/
    static async updateProduct(req, res) {
        const {error} = validateProduct(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const { name, description, unit, price, sale_price, quantity, discount } = req.body;

        const { id } = req.params;
        try {
            const product = await Product.findByPk(id);

            if (!product) return res.status(404).json({
                error: true,
                msg: 'Product not found'
            });

            const image = (req.files) ? await uploadImage(req.files.image, 1) : product.image ;
            //updateFile Object
            const updateFile = {};
            if (name) updateFile.name = name;
            if (description) updateFile.description = description;
            if (unit) updateFile.unit = unit;
            if (price) updateFile.price = price;
            if (sale_price) updateFile.sale_price = sale_price;
            if (quantity) updateFile.quantity = quantity;
            if (discount) updateFile.discount = discount;
            updateFile.image = image;

            const updatedProduct = await product.update(updateFile);

            return res.status(200).json({
                error: false,
                updatedProduct,
                msg: 'Product updated successfully'
            })
        } catch (e) {
            console.error(e);
            res.status(500).send('Internal server error...');
        }
    }

    /**
     *@static
     * @desc  Delete a product
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {object} json product object
     **/
    static async deleteProduct(req, res) {
        const { id } = req.params;

        try {
             const product = await Product.findByPk(id);

             if (!product) return res.status(404).json({
                 error: true,
                 msg: 'Product not found'
             });

             await product.destroy({ force: true });

             return res.status(200).json({
                 error: false,
                 'msg': 'Product deleted successfully'
             });
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }
}

export default ProductController;