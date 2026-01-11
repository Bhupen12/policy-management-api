import { AccountModel, AgentModel, CategoryModel, CompanyModel, PolicyModel, UserModel } from '../models/index.js';

export const saveRows = async (rows) => {
  let cnt = rows.length;
  for (const row of rows) {
    --cnt;
    // Agent 
    let agent = await AgentModel.findOne({ name: row.agent });
    if (!agent) {
      agent = new AgentModel({ name: row.agent });
      await agent.save();
    }

    // User
    let user = await UserModel.findOne({ email: row.email });
    if (!user) {
      user = new UserModel({
        firstName: row.firstname,
        dob: typeof row.dob === 'number' ? new Date(row.dob) : row.dob,
        address: row.address,
        phone: row.phone,
        state: row.state,
        zip: row.zip,
        email: row.email,
        gender: row.gender,
        userType: row.userType
      });
      await user.save();
    }

    // Account
    let account = await AccountModel.findOne({ name: row.account_name });
    if (!account) {
      account = new AccountModel({
        name: row.account_name,
        user: user._id
      });
      await account.save();
    }

    // Lob
    let category = await CategoryModel.findOne({ name: row.category_name });
    if (!category) {
      category = new CategoryModel({ name: row.category_name });
      await category.save();
    }

    // Company
    let company = await CompanyModel.findOne({ name: row.company_name });
    if (!company) {
      company = new CompanyModel({ name: row.company_name });
      await company.save();
    }

    // Policy
    if (row.policy_number) {
      let policy = await PolicyModel.findOne({ policyNumber: row.policy_number });
      if (!policy) {
        const policyData = {
          policyNumber: row.policy_number,
          startDate: typeof row.policy_start_date === 'number' ? new Date(row.policy_start_date) : row.policy_start_date,
          endDate: typeof row.policy_end_date === 'number' ? new Date(row.policy_end_date) : row.policy_end_date,
          user: user._id,
          category: category._id,
          company: company._id
        }
        policy = new PolicyModel(policyData);
        await policy.save();
      }
    }
  }
}
