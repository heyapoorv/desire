// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// // Routes
// const resumeRoutes = require("./routes/resumeRoutes");
// app.use("/api", resumeRoutes);

// // Serve frontend if needed
// app.use(express.static(path.join(__dirname, "client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

// app.listen(port, () => {
//   console.log(`✅ Server running at http://localhost:${port}`);
// });
const express = require("express");
const cors = require("cors");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
