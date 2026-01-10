import { PolicyModel, UserModel } from "./models/index.js";

export const findPoliciesByUsername = async (username) => {
  const user = await UserModel.findOne({
    $or: [
      { email: username },
      { firstName: username }
    ]
  });

  if (!user) {
    return null;
  }

  const policies = await PolicyModel.find({ user: user._id })
    .populate('category')
    .populate('career')
    .populate('user');

  return policies;
}