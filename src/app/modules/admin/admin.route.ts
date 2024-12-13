import { Router } from 'express';
import { adminControllers } from './admin.controller';
import dataValidator from '../../middlwares/dataValidator';
import { AdminValidations } from './admin.validation';

const router = Router();

router.get('/', adminControllers.getAllAdmins);
router.get('/:id', adminControllers.getSingleAdmins);
router.delete('/:id', adminControllers.deleteAdmin);
router.patch(
  '/:id',
  dataValidator(AdminValidations.updateAdminSchema),
  adminControllers.updateAdmin,
);

export const adminRouters = router;
