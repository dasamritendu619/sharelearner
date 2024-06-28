import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHendeler.meddleware.js";

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

// import routes
import userRoute from "./routes/user.route.js";
import healthCheckRoute from "./routes/healthCheck.route.js";
import postRoute from "./routes/post.route.js";
import likesRoute from "./routes/likes.route.js";

// use routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/healthCheck",healthCheckRoute);
app.use("/api/v1/post",postRoute);
app.use("/api/v1/likes",likesRoute);


app.use(errorHandler);
export default app;