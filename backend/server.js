import app from "./app.js";
const PORT = 3000;

app.get("/", (req, res) => {
  req.send("jalan");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
