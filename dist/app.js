"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const todo_route_1 = require("./todo/todo.route");
const nodemailer_1 = __importDefault(require("nodemailer"));
const mongodb_connection_1 = require("./mongodb.connection");
const node_cron_1 = __importDefault(require("node-cron"));
const todo_model_1 = __importDefault(require("./model/todo.model"));
const app = (0, express_1.default)();
// Enable CORS for all origins (development)
app.use((0, cors_1.default)({
    origin: "*", // or your vercel domain
    credentials: true
}));
// Parse JSON body
app.use(express_1.default.json());
(0, mongodb_connection_1.Mongodb)();
// Register all routes from your routes array
todo_route_1.routes.forEach(([path, config]) => {
    app.use(`/api/${path}`, config.handler);
});
// Optional: Root health check
app.get('/', (req, res) => {
    res.send('API is running!');
});
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME || "rashmitamhatre59@gmail.com", // your email
        pass: process.env.EMAIL_PASSWORD || "wblp sjpa wjgl oitl", // app password
    },
});
// Cron job to check for reminders every minute
node_cron_1.default.schedule("* * * * *", async () => {
    console.log("⏰ Checking reminders...");
    const now = new Date();
    // Mongoose find() returns Promise<Todo[]>
    const dueTodos = await todo_model_1.default.find({
        reminderAt: { $lte: now },
        reminded: false,
    });
    if (dueTodos.length === 0)
        return;
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
        }
        catch (error) {
            console.error("Email sending failed:", error);
        }
    }
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
