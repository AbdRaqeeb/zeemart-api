import 'dotenv/config'
import { sign } from 'jsonwebtoken';
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';

import { Admin, Product } from '../../../database/models';
import { validateUser, validateLogin }  from '../../../middleware/Validate';

/**
 * @class   Admin controller
 * */
class AdminController {
    /***
     * @static
     * @desc    Register admin
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {token}  access token
     * @access  Public
     */
    static async register(req, res) {
        // Input Validation
        const { error } = validateUser(req.body);
        if (error) return  res.status(400).json(error.details[0].message);

        try {
            const { firstname, lastname, email, password, phone  } = req.body;
            let admin = await Admin.findOne({
                where: {
                    email
                }
            });

            if (admin) return res.status(400).json({
                error: true,
                msg: 'Admin already exist'
            });

            admin = Admin.build({
                firstname,
                lastname,
                email,
                password,
                phone,
            });

            // Hash password before saving to database
            const salt = genSaltSync(10);
            admin.password = hashSync(password, salt);

            await admin.save();

            const payload = {
                admin: {
                    id: admin.admin_id,
                    role: admin.role,
                    email: admin.email
                }
            };

            sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                res.json({
                    error: false,
                    msg: 'Admin created successfully',
                    token
                })
            })

        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }

    }


    /**
     * @desc    login a admin
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {token}  access token
     * @access  Public
     */
    static async login(req, res) {
        // Input Validation
        const { error } = validateLogin(req.body);
        if (error) return  res.status(400).json(error.details[0].message);

        const { email, password } = req.body;
        try {
            const admin = await Admin.findOne({
                where: {
                    email
                }
            })

            if (!admin) return res.status(404).json({
                error: true,
                msg: 'Invalid email'
            });

            const validPassword = compareSync(password, admin.password);
            if (!validPassword) return res.status(400).json({
                error: true,
                msg: 'Invalid password'
            });

            const payload = {
                admin: {
                    id: admin.admin_id,
                    email: admin.email,
                    role: admin.role,
                    firstname: admin.firstname,
                    lastname: admin.lastname,
                    phone: admin.phone,
                    address: admin.address,
                    billing_address: admin.billing_address
                }
            };

            sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                res.json({
                    error: false,
                    msg: 'Login successful',
                    token
                })
            })

        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     * @desc    Get a logged in admin
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {object}  json object admin details
     * @access  Private
     */
    static async loggedIn(req, res) {
        try {
            const admin = await Admin.findByPk(req.admin.id, {
                include: Product
            });
            if (!admin) return res.status(404).json({
                error: true,
                msg: 'Admin with this id does not exist'
            })

            return res.status(200).json({
                error: false,
                msg: 'Successful',
                admin
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     * @desc    Update a admin profile
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {object}  json object admin details
     * @access  Private
     */
    static async update(req, res) {
        const { error } = validateUser(req.body);
        if (error) return  res.status(400).json(error.details[0].message);

        try {
            const admin = await Admin.findByPk(req.admin.id);

            if (!admin) return res.status(404).json({
                error: true,
                msg: 'Admin not found'
            });

            const updatedUser = await Admin.update(req.body);

            return res.status(201).json({
                error: false,
                msg: 'Admin updated successfully',
                updatedUser
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }
}

export default AdminController;