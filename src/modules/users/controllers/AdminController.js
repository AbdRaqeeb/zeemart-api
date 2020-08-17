import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import { hashSync, genSaltSync } from 'bcryptjs';

import { User } from '../../../database/models';
import { validateUser } from '../../../middleware/Validate';


/**
 * @class   AdminController controller
 * */

class AdminController {
    /**
     * @static
     * @desc    Register AdminController
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {token}  access token
     */
    static async registerAdmin(req, res) {
        // Input Validation
        const { error } = validateUser(req.body);
        if (error) return  res.status(400).json(error.details[0].message);

        try {
            const { firstname, lastname, email, password, phone } = req.body;
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
                role: 'admin',
            });

            // Hash password before saving to database
            const salt = genSaltSync(10);
            user.password = hashSync(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.user_id,
                    role: user.role,
                    email: user.email,
                }
            };

            sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                res.header('x-auth-token', token).json({
                    error: false,
                    msg: 'Admin created successfully',
                })
            })

        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }

    }
}

export default AdminController;