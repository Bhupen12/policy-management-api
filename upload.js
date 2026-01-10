import multer from 'multer';
import xlsx from 'xlsx';

const upload = multer({ storage: multer.memoryStorage() });

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet);

  console.log(rows);
  // [
  //   {
  //     agent: 'Alex Watson',
  //     userType: 'Active Client',
  //     policy_mode: 12,
  //     producer: 'Phil Chico',
  //     policy_number: 'CIW9MRIILHO9',
  //     premium_amount: 1593,
  //     policy_type: 'Single',
  //     company_name: 'Nationwide Gen Ins Co',
  //     category_name: 'Commercial Auto',
  //     policy_start_date: 43220.22928240741,
  //     policy_end_date: 43585.22928240741,
  //     csr: 'Delmer Byrd',
  //     account_name: 'Joane Needleman & Rubin Michael',
  //     email: 'jfmulder@me.com',
  //     firstname: 'Joane Needleman',
  //     city: 'Lewisville',
  //     account_type: 'Commercial',
  //     phone: '(336) 414-4913',
  //     address: '8390 Grove Creek Dr',
  //     state: 'NC',
  //     zip: '27023-3003',
  //     dob: 26938.229282407407
  //   }
  // ]
  res.send('File uploaded and processed successfully.');
};

export { upload, uploadFile };
