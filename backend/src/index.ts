import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cityRoute from "./routes/city.route";
import bodyParser from "body-parser";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use("/api/v1", cityRoute());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.listen(port || 8001, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port || 8001}`);
});
