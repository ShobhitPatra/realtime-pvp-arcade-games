import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use("/v1", routes);
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
