import express from "express";
import dotenv from "dotenv";
import Schema from "./Schema/schema.js";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { connectDB } from "./Config/db.js";
dotenv.config();

// connect to mongodb
connectDB();
const port = process.env.PORT || 8000;
const app = express();
app.use(cors());

// route
app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: process.env.NODE_ENV === "devolopment",
  })
);

// connected to localhost
app.listen(port, () => {
  console.log(`server connected to localhost ${port}`);
});
