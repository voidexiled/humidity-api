import express from "express";
import cors from "cors";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    const newName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "");
    cb(null, newName);
  },
});

const upload = multer({ storage: storage });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.post("/api/upload", upload.single("url"), async (req, res) => {
  const { file } = req;
  console.log("Archivo:", file);
  if (!file) {
    return res.status(400).json({
      message: "Image is required",
    });
  }

  return res.status(200).json({
    data: [],
    message: "Image uploaded successfully",
  });
});

app.get("api/images", async (req, res) => {
  return res.status(200).json({
    data: [],
  });
});

app.get("/api/images/:id", async (req, res) => {});

app.get("/api/images/last", async (req, res) => {});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
