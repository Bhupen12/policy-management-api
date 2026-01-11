import { AccountModel, AgentModel, CarrierModel, PolicyCategoryModel, PolicyModel, UserModel } from '../models/index.js';

const excelDateToJS = (value) => {
  if (typeof value === 'number') {
    return new Date(Math.round((value - 25569) * 86400 * 1000));
  }
  return value ? new Date(value) : null;
};

export const saveRows = async (rows) => {
  for (const row of rows) {
    const agent = row.agent
      ? await AgentModel.findOneAndUpdate(
        { name: row.agent },
        { $setOnInsert: { name: row.agent } },
        { upsert: true, new: true }
      )
      : null;

    const user = row.email
      ? await UserModel.findOneAndUpdate(
        { email: row.email },
        {
          $setOnInsert: {
            firstName: row.firstname,
            dob: excelDateToJS(row.dob),
            address: row.address,
            phone: row.phone,
            state: row.state,
            zip: row.zip,
            email: row.email,
            gender: row.gender,
            userType: row.userType
          }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
      : null;

    const category = row.category_name
      ? await PolicyCategoryModel.findOneAndUpdate(
        { name: row.category_name },
        { $setOnInsert: { name: row.category_name } },
        { upsert: true, new: true }
      )
      : null;

    const carrier = row.company_name
      ? await CarrierModel.findOneAndUpdate(
        { name: row.company_name },
        { $setOnInsert: { name: row.company_name } },
        { upsert: true, new: true }
      )
      : null;

    const account = row.account_name && user
      ? await AccountModel.findOneAndUpdate(
        { name: row.account_name, user: user._id },
        { $setOnInsert: {
          name: row.account_name,
          user: user._id
        } },
        { upsert: true, new: true }
      )
      : null;

    // Policy
    if (row.policy_number && user) {
      await PolicyModel.findOneAndUpdate(
        { policyNumber: row.policy_number },
        {
          $setOnInsert: {
            policyNumber: row.policy_number,
            startDate: excelDateToJS(row.policy_start_date),
            endDate: excelDateToJS(row.policy_end_date),
            user: user._id,
            category: category?._id,
            carrier: carrier?._id,
            agent: agent?._id,
            account: account?._id,
          }
        },
        { upsert: true, new: true }
      );
    }
  }
}
