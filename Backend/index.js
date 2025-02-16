import express, { urlencoded } from "express";
import connectDB from './utils/db.js';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from './routes/user.routes.js';
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.routes.js"
import path from "path";

dotenv.config();
// connect db
connectDB();
const PORT = process.env.PORT || 8080;
const app = express();

const _dirname = path.resolve();


// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:"https://jobportal-fghp.onrender.com",
    credentials:true
}
app.use(cors(corsOptions));

// api's route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get('*', (_,res) => {
    res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});
