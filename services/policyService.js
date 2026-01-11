import { PolicyModel, UserModel } from "../models/index.js";

export const findPoliciesByUsername = async (username) => {
  const user = await UserModel.findOne({ email: username });

  if (!user) {
    return null;
  }

  const policies = await PolicyModel.find({ user: user._id })
    .populate('category')
    .populate('carrier')
    .populate('user');

  return policies;
}

export const aggregatePoliciesByUser = async () => {
  const today = new Date();

  return PolicyModel.aggregate([
    {
      $group: {
        _id: "$user",
        totalPolicies: { $sum: 1 },
        activePolicies: {
          $sum: {
            $cond: [{ $gte: ["$endDate", today] }, 1, 0]
          }
        },
        expiredPolicies: {
          $sum: {
            $cond: [{ $lt: ["$endDate", today] }, 1, 0]
          }
        }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        userId: "$user._id",
        firstName: "$user.firstName",
        email: "$user.email",
        totalPolicies: 1,
        activePolicies: 1,
        expiredPolicies: 1
      }
    }
  ]);
};
