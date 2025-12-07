import express from 'express';
import cors from 'cors';
import { routes } from "./todo/todo.route"; 
import nodemailer from "nodemailer";
import { Mongodb } from './mongodb.connection';
import cron from "node-cron";
import  Itodolist  from "./model/todo.model"

const app = express();

// Enable CORS for all origins (development)
app.use(cors({
  origin: "*",   // or your vercel domain
  credentials: true
}));


// Parse JSON body
app.use(express.json());

Mongodb();

// Register all routes from your routes array
routes.forEach(([path, config]) => {
  app.use(`/api/${path}`, config.handler);
});

// Optional: Root health check
app.get('/', (req, res) => {
  res.send('API is running!');
});
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME || "rashmitamhatre59@gmail.com",   // your email
    pass: process.env.EMAIL_PASSWORD || "wblp sjpa wjgl oitl",   // app password
  },
});

// Cron job to check for reminders every minute
cron.schedule("* * * * *", async () => {
  console.log("⏰ Checking reminders...");

  const now = new Date();

  // Mongoose find() returns Promise<Todo[]>
  const dueTodos = await Itodolist.find({
    reminderAt: { $lte: now },
    reminded: false,
  });

   if (dueTodos.length === 0) return;

  // Now dueTodos is an array, no TypeScript error
   for (const todo of dueTodos) {
    try {
      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME || "rashmitamhatre59@gmail.com",
        to: "rashmitamhatre59@gmail.com", // replace with actual user
        subject: "⏰ Todo Reminder",
        text: `Reminder: ${todo.text}\nDue at: ${todo.reminderAt}`,
      });

      // Update this todo as reminded
      todo.reminded = true;
      await todo.save();

      console.log(`Email sent for todo: ${todo.text}`);
    } catch (error) {
      console.error("Email sending failed:", error);
    }
  }
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
