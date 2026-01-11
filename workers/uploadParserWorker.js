import { parentPort } from 'worker_threads';
import xlsx from 'xlsx';

if (!parentPort) throw new Error('This file must be run as a worker thread');

parentPort.on('message', async (message) => {
  const { arrayBuffer } = message;

  try {
    const buffer = Buffer.from(arrayBuffer);
    const workbook = xlsx.read(buffer, { type: 'buffer' });

    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      throw new Error('No sheets found in workbook');
    }

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const normalize = rows.map((row) => {
      const normalizedRow = {};
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const value = row[key];
          normalizedRow[key.toLowerCase()] = value;
        }
      }

      if (normalizedRow.policy_start_date && typeof normalizedRow.policy_start_date === 'number') {
        normalizedRow.policy_start_date = new Date(
          Math.round((normalizedRow.policy_start_date - 25569) * 86400 * 1000)
        );
      }
      if (normalizedRow.policy_end_date && typeof normalizedRow.policy_end_date === 'number') {
        normalizedRow.policy_end_date = new Date(
          Math.round((normalizedRow.policy_end_date - 25569) * 86400 * 1000)
        );
      }

      if (normalizedRow.dob && typeof normalizedRow.dob === 'number') {
        normalizedRow.dob = new Date(
          Math.round((normalizedRow.dob - 25569) * 86400 * 1000)
        );
      }
      return normalizedRow;
    });

    parentPort.postMessage({
      success: true,
      rows: normalize,
    });
  } catch (error) {
    parentPort.postMessage({
      success: false,
      error: error.message,
    });
  }
})