import cron from "node-cron";
import { processScheduledMessages } from "../services/messageService";

export const startMessageCron = () => {
  cron.schedule("*/30 * * * * *", async () => {
    try {
      await processScheduledMessages();
      console.log("Scheduled messages processed");
    } catch (error) {
      console.error("Cron Job Error:", error);
    }
  });
};
