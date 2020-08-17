import 'dotenv/config'
import { sign } from 'jsonwebtoken';
import { hashSync, genSaltSync, compare } from 'bcryptjs';

import { User, Order } from '../../../database/models';
import { validateUser, validateLogin }  from '../../../middleware/Validate';

/**
 * @class   User controller
 * */
class UserController {
    /***
     * @static
     * @desc    Register customer
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
            let user = await User.findOne({
                where: {
                    email
                }
            });

            if (user) return res.status(400).json({
                error: true,
                msg: 'User already exist'
            });

            user = User.build({
                firstname,
                lastname,
                email,
                password,
                phone,
            });

            // Hash password before saving to database
            const salt = genSaltSync(10);
            user.password = hashSync(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.user_id,
                    role: user.role,
                    email: user.email
                }
            }

            sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                res.header('x-auth-token', token).json({
                    error: false,
                    msg: 'User created successfully',
                })
            })

        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }

}


    /**
     * @desc    login a customer
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
            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) return res.status(404).json({
                error: true,
                msg: 'Invalid email'
            });

            const validPassword = compare(password, user.password);
            if (!validPassword) return res.status(400).json({
                error: true,
                msg: 'Invalid password'
            });

            const payload = {
                user: {
                    id: user.user_id,
                    email: user.email,
                    role: user.role,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone: user.phone,
                    address: user.address,
                    billing_address: user.billing_address
                }
            };

            sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                res.header('x-auth-token', token).json({
                    error: false,
                    msg: 'Login successful',
                })
            })

        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     * @desc    Get a logged in user
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {object}  json object user details
     * @access  Private
     */
    static async loggedIn(req, res) {
        try {
            const user = await User.findByPk(req.user.user_id, {
               include: Order
            });
            if (!user) return res.status(404).json({
                error: true,
                msg: 'User with this id does not exist'
            })

            return res.status(200).json({
                error: false,
                msg: 'Successful',
                user
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     * @desc    Update a user profile
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {object}  json object user details
     * @access  Private
     */
    static async update(req, res) {
        const { error } = validateUser(req.body);
        if (error) return  res.status(400).json(error.details[0].message);

        try {
            const user = await User.findByPk(req.user.user_id);

            if (!user) return res.status(404).json({
                error: true,
                msg: 'User not found'
            });

            const updatedUser = await User.update(req.body);

            return res.status(201).json({
                error: false,
                msg: 'User updated successfully',
                updatedUser
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }
}

export default UserController;
