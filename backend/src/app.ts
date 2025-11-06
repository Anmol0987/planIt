import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import tripRoutes from "./modules/trip/trip.routes";
import inviteRoutes from "./modules/invite/invite.routes";
import helmet from "helmet";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/trip", tripRoutes);
app.use("/api/v1/invite", inviteRoutes);

app.get("/", (_, res) => res.send("Trip SaaS Backend Running "));

export default app;
