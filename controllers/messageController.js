import { scheduleMessage } from "../services/messageService.js";

export const postScheduledMessage = async (req, res) => {
  try {
    const { message, day, time } = req.body;

    if (!message || !day || !time) {
      return res.status(400).json({ error: "message, day and time are required" });
    }

    const scheduledAt = new Date(`${day} ${time}`);

    if (isNaN(scheduledAt.getTime())) {
      return res.status(400).json({ error: "Invalid date or time" });
    }

    await scheduleMessage(message, scheduledAt);

    const istTime = new Date(scheduledAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata"
    });

    return res.status(201).json({
      message: "Message scheduled successfully",
      scheduledAt: istTime
    });
  } catch (error) {
    console.error('Error Scheduling Message:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}