import 'dotenv/config'
import { sign } from 'jsonwebtoken';
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';

import { Admin, Product } from '../../../database/models';
import { validateUser, validateLogin, validatePassword }  from '../../../middleware/Validate';

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
    static async registerAdmin(req, res) {
        // Input Validation
        const { error } = validateUser(req.body, 1);
        if (error) return  res.status(400).json(error.details[0].message);

        try {
            const { firstname, lastname, email, password, phone, role  } = req.body;
            let new_admin = await Admin.findOne({
                where: {
                    email
                }
            });

            if (new_admin) return res.status(400).json({
                error: true,
                msg: 'Admin already exist'
            });

            new_admin = Admin.build({
                firstname,
                lastname,
                email,
                password,
                phone,
                role
            });

            // Hash password before saving to database
            const salt = genSaltSync(10);
            new_admin.password = hashSync(password, salt);

            await new_admin.save();

            const admin = await Admin.findByPk(new_admin.admin_id, {
                include: Product
            });

            return res.status(200).json({
                error: false,
                msg: 'Admin created successfully',
                admin
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
            });

            if (!admin) return res.status(404).json({
                error: true,
                msg: 'Invalid email'
            });

            if (admin.status === 'ban' || admin.status === 'suspend') {
                return res.status(400).json({
                    error: true,
                    msg: 'Permission denied, user cannot login'
                })
            }

            const validPassword = compareSync(password, admin.password);
            if (!validPassword) return res.status(400).json({
                error: true,
                msg: 'Invalid password'
            });

            const payload = {
                    id: admin.admin_id,
                    email: admin.email,
                    role: admin.role,
                    firstname: admin.firstname,
                    lastname: admin.lastname,
                    phone: admin.phone,
                    address: admin.address,
                    billing_address: admin.billing_address
            };

            sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                res.json({
                    error: false,
                    msg: 'Login successful',
                    token,
                    admin
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
            const admin = await Admin.findByPk(req.user.id, {
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
     * @desc    Get all admins
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {object}  json object admin details
     * @access  Private
     */
    static async getAdmins(req, res) {
        try {
            const admins = await Admin.findAll({
                include: Product
            });

            if (admins.length === 0) return res.status(404).json({
                error: true,
                msg: 'No admin found'
            });

            return res.status(200).json({
                error: false,
                admins
            })
        } catch (e) {
            console.log(e.message);
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
    static async updateAdmin(req, res) {
        const { error } = validateUser(req.body);
        if (error) return  res.status(400).json(error.details[0].message);

        try {
            const admin = await Admin.findByPk(req.user.id);

            if (!admin) return res.status(404).json({
                error: true,
                msg: 'Admin not found'
            });


            const updatedUser = await admin.update(req.body);

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

    /**
     * @desc    Update an admin status
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {object}  json object admin details
     * @access  Private
     */
    static async updateAdminStatus(req, res) {
            const { admin_id } = req.body;
        try {
            const admin = await Admin.findByPk(admin_id);
            if (!admin) return res.status(404).json({
                error: true,
                msg: 'Admin not found'
            });

            const updated = await admin.update(req.body);

            if(!updated) return res.status(400).json({
                error: true,
                msg: 'Error on update'
            })

            const updatedAdmin = await Admin.findByPk(admin_id, {include: [
                {
                    model: Product
                }
            ]});


            return res.status(200).json({
                error: false,
                msg: 'Admin updated successfully',
                updatedAdmin
            })
        } catch (e) {
            console.error(e);
            res.status(500).send('Internal server error...')
        }
    }

     /**
     * @desc    Update password
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {object}  json object admin details
     * @access  Private
     */
    static async updatePassword(req, res) {
        const { error } = validatePassword(req.body);
        if (error) return  res.status(400).json(error.details[0].message);


        const { old_password, new_password } = req.body;
        try {
            const admin = await Admin.findByPk(req.user.id);

            if (!admin) return res.status(404).json({
                error: true,
                msg: 'Admin not found'
            })

            const validPassword = compareSync(old_password, admin.password);

            if (!validPassword) return res.status(400).json({
                error: true,
                msg: 'Passord mismatch'
            });

            const salt = genSaltSync(10);
            admin.password = hashSync(new_password, salt);
            
            await admin.save();

            return res.status(200).json({
                error: false,
                msg: 'Password changed successfully',
            });
        
        } catch (err) {
            console.log(e.message);
            res.status(500).send('Internal server error...')
        }
    }


    /**
     * @desc    Delete Admin
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {object}  json object admin details
     * @access  Private
     */
    static async deleteAdmin(req, res) {
        const { id } = req.params;
        try {
            const admin = await Admin.findByPk(id);

            if (!admin) return res.status(404).json({
                error: true,
                msg: 'Admin with the ID not found'
            });

            await admin.destroy({ force: true });

            return res.status(200).json({
                error: false,
                msg: 'Admin deleted successfully'
            })
        } catch (err) {
            console.log(e.message);
            res.status(500).send('Internal server error');
        }
    }
}



export default AdminController;