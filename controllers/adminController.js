// controllers/adminController.js
import { User } from '../models/userModel.js';

const ALLOWED = ['client', 'admin', 'vendor', 'driver'];

export const changeUserRoleController = async (req, res) => {
  try {
    const { id } = req.params;
    const { usertype } = req.body;

    if (!id || !usertype) {
      return res.status(400).send({ success: false, msg: 'id and usertype are required' });
    }
    if (!ALLOWED.includes(usertype)) {
      return res.status(400).send({ success: false, msg: 'Invalid role' });
    }

    const updated = await User.findByIdAndUpdate(
      id,
      { usertype },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updated) {
      return res.status(404).send({ success: false, msg: 'User not found' });
    }

    // TODO: add audit log (who changed whom, old->new, timestamp)
    return res.status(200).send({ success: true, msg: 'Role updated', user: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, msg: 'Error updating role' });
  }
};