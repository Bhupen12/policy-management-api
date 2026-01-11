import { PolicyModel, UserModel } from "./models/index.js";

export const findPoliciesByUsername = async (username) => {
  const user = await UserModel.findOne({ email: username });

  if (!user) {
    return null;
  }

  const policies = await PolicyModel.find({ user: user._id })
    .populate('category')
    .populate('company')
    .populate('user');

  return policies;
}