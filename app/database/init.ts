import mongoose from "mongoose";
import { createWSServer } from "../ws/initWs";

export const initDB = async () => {
  if (mongoose.connections[0].readyState) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const db = mongoose.connection;
  createWSServer();

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", async () => {
    console.log("Database connected");
  });
};
