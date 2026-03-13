import express from 'express';
import { Env } from './lib/env.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDb } from './lib/db.js';
import cors from 'cors'
import { functions, inngest } from './lib/inngest.js';
import {serve} from "inngest/express"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors({origin:Env.CLIENT_URL,credentials:true}))
app.use(express.urlencoded({ extended: true }));

app.use("/api/inngest",serve({client:inngest,functions}))


app.get("/health", (req, res) => {
    res.json({ success: true, msg: "Done" });
});

// Mount your other API routers here, e.g.:
// app.use("/api/users", userRouter);

if (Env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../../Frontend/dist')));


    app.get("/{*any}", (req, res) => {
        console.log("Comes in ")
        res.sendFile(path.join(__dirname, '../../Frontend', 'dist', 'index.html'));
    });

}

const startServer = async () => {
    try {
        await connectDb();
        app.listen(Env.PORT, () => console.log(`Server is running on http://localhost:${Env.PORT}`))

    } catch (error) {
        console.log("Error starting the server",error)
    }
};
startServer();