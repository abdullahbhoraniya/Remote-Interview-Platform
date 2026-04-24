import express from 'express';
import { Env } from './lib/env.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDb } from './lib/db.js';
import cors from 'cors'


import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import chatRouter from './routes/chat.route.js';
import sessionRouter from './routes/session.route.js';
import roleRouter from './routes/onboard.route.js';
import otpRoute from './routes/otp.route.js';
import recruiterRouter from './routes/recruiter.route.js';
import candidateRoute from './routes/candidate.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
console.log('Client_url',Env.CLIENT_URL)
app.use(cors({origin:Env.CLIENT_URL,credentials:true}))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Mount your other API routers here, e.g.:
app.use("/api/auth", authRouter);

app.use("/api/chat",chatRouter)
app.use("/api/sessions",sessionRouter);
app.use(`/api/onboarding`,roleRouter);
app.use(`/api/otp`,otpRoute);
app.use(`/api/recruiter`,recruiterRouter);
app.use('/api/candidate',candidateRoute);

// Logout controller
app.post("/api/logout", (req, res) => {
    console.log("Logout endpoint hit");
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,       // true in production (HTTPS)
    sameSite: "strict",
  });
  console.log("Token cookie cleared");
  res.status(200).json({ message: "Logged out" });
});


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