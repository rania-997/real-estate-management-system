import express from "express"
import cors from "cors"
import propertyRoutes from "./routes/propertyRoutes.js"
import authRoutes from "./routes/authRoutes.js"
const app=express()
app.use(cors())
app.use(express.json())
app.use('/api/properties',propertyRoutes)
app.use("/api/auth", authRoutes);
export default app;