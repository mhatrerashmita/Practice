// Import modules
import express, { Request, Response } from 'express';
import { Mongodb } from "./mongodb.connection";
import { Book } from "./model/book.model";
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
// Create an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
Mongodb();

// Set the port number for the server
const port = 3000;

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Node.js + Express!');
});

// POST /book route

app.post("/book", async (req: Request, res: Response) => {
  try {
    const result = await Book.insertOne(req.body);
    res.status(201).json({ message: "Book created", data: result });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/books', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    const matchStage = {
      $match: {
        name: { $regex: search as string, $options: 'i' } // case-insensitive search on book name
      }
    };

    const aggregate = Book.aggregate([
      matchStage,
      { $sort: { name: 1 } }, // optional sorting
    ]);

    const options = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
    };

    const result = await (Book as any).aggregatePaginate(aggregate, options);

    res.status(200).json(result);
  } catch (error: any) {
    console.error("Pagination error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/book-group", async (req: Request, res: Response) => {
  try {
    const bookGroup = {
      $group: {
        _id: null,
        count: { $count: {} }
      }
    }
    const aggregate = Book.aggregate([bookGroup]);
    const result = await (Book as any).aggregatePaginate(aggregate)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}
)


// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
