import { ScheduledMessageModel } from "../models/index.js";

export const scheduleMessage = async (message, scheduledAt) => {
  return await ScheduledMessageModel.create({
    message,
    scheduledAt,
    status: "PENDING"
  });
}