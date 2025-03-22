import * as dotenv from "dotenv";
import { User } from "./user.js";
import { Category } from "./category.js";
import { POI } from "./poi.js";
import Mongoose from "mongoose";
import * as mongooseSeeder from "mais-mongoose-seeder";
import { seedData } from "./seed-data.js";

dotenv.config();

const seedLib = mongooseSeeder.default;

async function seed() {
  const seeder = seedLib(Mongoose);
  const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
  console.log("Database seeded with:", dbData);
}

export async function connectMongo() {
    Mongoose.set("strictQuery", true);
  
    try {
      await Mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/wanderly");
      console.log("MongoDB Connected to:", Mongoose.connection.name);
      await seed();
    } catch (err) {
      console.error("MongoDB Connection Error:", err);
      process.exit(1);
    }
}
