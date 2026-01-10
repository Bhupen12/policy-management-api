import multer from 'multer';
import xlsx from 'xlsx';
import { AccountModel, AgentModel, CareerModel, LOBModel, PolicyModel, UserModel } from './models/index.js';

const upload = multer({ storage: multer.memoryStorage() });

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet);

  for (const row of rows) {
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
    let lob = await LOBModel.findOne({ name: row.category_name });
    if (!lob) {
      lob = new LOBModel({ name: row.category_name });
      await lob.save();
    }

    // Career
    let career = await CareerModel.findOne({ name: row.producer });
    if (!career) {
      career = new CareerModel({ name: row.company_name });
      await career.save();
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
          category: lob._id,
          career: career._id
        } 
        policy = new PolicyModel(policyData);
        await policy.save();
      }
    }
  }


  res.send('File uploaded and processed successfully.');
};

export { upload, uploadFile };
