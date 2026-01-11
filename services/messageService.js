import { MessageModel, ScheduledMessageModel } from "../models/index.js";

export const scheduleMessage = async (message, scheduledAt) => {
  return await ScheduledMessageModel.create({
    message,
    scheduledAt,
    status: "PENDING"
  });
}

export const processScheduledMessages = async () => {
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
  }
};