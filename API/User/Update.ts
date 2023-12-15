import { Request, Response } from 'express';
import { userModel } from '../../schema/userSchema';

export async function userUpdate(req: Request, res: Response) {
  const { id } = req.params;
  const newData = req.body;

  try {

    const updatedUser = await userModel.findByIdAndUpdate(id, newData, { new: true });

    if (updatedUser) {
      res.status(200).json({ message: 'User update successfully!', user: updatedUser });
    } else {
      res.status(404).json({ message: 'User Not Found!' });
    }
  } catch (error) {
    console.error('Error update:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
