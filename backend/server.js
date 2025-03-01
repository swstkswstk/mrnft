import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js"
import { aj } from "./lib/arcjet.js";
import path from "path";


dotenv.config()
const app = express();


const PORT = process.env.PORT || 3000
console.log(PORT);
const __dirname = path.resolve();


app.use(express.json());
app.use(cors());
app.use(helmet(
  {
    contentSecurityPolicy: false,
  }
));//helmet ek security middleware hai jo apne app ko secure krta by providing various HTTP server
app.use(morgan("dev"));//bhai ye sari request ko log krta hai

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,//every requests consume 1 token
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too many request" });
      }
      else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      }
      else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      res.status(403).json({ error: "Spoofed bot detected" });
    }
    next();

  } catch (error) {
    console.log("Arcjet Error", error);
    next(error);
  }
})



app.use("/api/products", productRoutes)

async function initDB() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS products
    (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    
    `;

    console.log("database initialised successfully");
  } catch (error) {
    console.log("Error connecting to database", error);

  }
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}

initDB().then(() => {

  app.listen(PORT, () => {
    console.log("Server is running on the port", PORT);
  })


})