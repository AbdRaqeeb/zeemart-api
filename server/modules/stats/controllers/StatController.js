import { User, Admin } from '../../../database/models';

/**
 * @class Stat
 * @desc Controller for database statics
 **/
class StatController {
    /**
     *@static
     * @desc    Number of users
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {json} json users count
     **/
    static async userCount(req, res) {
        try {
            const users = await User.count();
            if (!users) return res.status.json({
                error: true,
                msg: 'No users'
            });
            return res.status(200).json({
                error: false,
                users
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     *@static
     * @param   No of b
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {json} json admin count
     **/
    static async adminCount(req, res) {
        try {
            const admins = await Admin.count();
            if (!admins) return res.status.json({
                error: true,
                msg: 'No admins'
            });
            return res.status(200).json({
                error: false,
                admins
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }
}

export default StatController;