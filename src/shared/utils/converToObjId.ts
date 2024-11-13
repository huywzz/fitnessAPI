import { Types } from 'mongoose';

export const convertObjectId = (id: string) => {
  const newId = new Types.ObjectId(id);
  return newId;
};
