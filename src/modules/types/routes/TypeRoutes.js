import { Router } from 'express';
import TypeController from "../controllers/TypeController";
import verify from "../../../middleware/verify";
import {authorize} from "../../../middleware/authorize";
import Roles from "../../../helpers/roles";

const { addType, getAllTypes, getOneType, deleteType, updateType } = TypeController;
const router = Router();

router.post('/', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], addType);
router.get('/', getAllTypes);
router.get('/:id', getOneType);
router.put('/', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], updateType);
router.delete('/:id', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], deleteType);

export default router;

