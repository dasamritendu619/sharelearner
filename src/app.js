import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHendeler.meddleware";

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    optionsSuccessStatus:200,
    credentials:true
}))
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true,limit:"10mb"}));
app.use(cookieParser());
app.use(express.static("public"));


app.use(errorHandler);
export default app;