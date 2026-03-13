import express from 'express';
import { Env } from './lib/env.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(Env.PORT, () => {
    console.log(`Server is running on http://localhost:${Env.PORT}`);
});