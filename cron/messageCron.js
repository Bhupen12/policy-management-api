import cron from "node-cron";
import { ScheduledMessageModel, MessageModel } from "../models/index.js";

export const startMessageCron = () => {
  cron.schedule("*/30 * * * * *", async () => {
    try {
      const now = new Date();

      const pendingMessages = await ScheduledMessageModel.find({
        scheduledAt: { $lte: now },
        status: "PENDING"
      });

      if (!pendingMessages.length) return;

      for (const job of pendingMessages) {
        await MessageModel.create({
          message: job.message,
          deliveredAt: new Date()
        });

        job.status = "PROCESSED";
        await job.save();
        console.log(`Processed scheduled message ID: ${job._id}`);
      }
    } catch (error) {
      console.error("Cron Job Error:", error);
    }
  });
};
