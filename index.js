const express = require("express");
const app = express();

app.use(express.json());

app.use("/items", require("./routes/items.router"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
