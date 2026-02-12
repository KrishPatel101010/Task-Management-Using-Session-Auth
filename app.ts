import express, { type Application } from "express";
import {authRouter,taskRouter} from "./routes/index.ts";
import dotenv from "dotenv";
import connectDb from "./config/db.ts";
import session from "express-session";
import MongoStore from "connect-mongo";
import { sessionAuth } from "./middlewares/sessionAuth.ts";

dotenv.config();
const PORT = process.env.PORT;

await connectDb();
const app: Application = express();
app.use(express.json());

app.use(session({
    name: "taskmanager.sid",
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI as string,
        collectionName: "sessions"
    }),
    cookie: {
        httpOnly: true,
        secure : false,
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

app.use("/",authRouter);
app.use("/tasks",sessionAuth,taskRouter);

app.listen(PORT,()=>{
    console.log("Server is running...");
})