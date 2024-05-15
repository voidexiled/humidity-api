import express from "express";
import cors from "cors";
import multer from "multer";

import {
  getLastMetric,
  getMetricByDay,
  getMetricByMonth,
  getMetricByYear,
  getMetrics,
  getWeekMetrics,
} from "./services/metrics/metricsServices";
import morganMiddleware from "./lib/morganMiddleware";

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
app.use("/images", express.static("images"));
app.use(cors());
app.use(morganMiddleware);
app.post("/api/image/upload", upload.single("url"), async (req, res) => {
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

app.get("/api/metrics/", (req, res) => {
  const metrics = getMetrics();
  if (metrics) {
    return res.status(200).json({
      metrics,
    });
  }

  return res.status(404).json({
    data: [],
    message: "No metrics found",
  });
});

app.get("/api/metrics/:id", (req, res) => {});
app.get("/api/metrics/year", (req, res) => {
  const currentYear = new Date().getFullYear();
  const metric = getMetricByYear(currentYear);
  if (metric) {
    return res.status(200).json({
      metric,
    });
  }
  return res.status(404).json({
    data: [],
    message: "No metrics found",
  });
});

app.get("/api/metrics/month", (req, res) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const metric = getMetricByMonth(currentYear, currentMonth);
  if (metric) {
    return res.status(200).json({
      metric,
    });
  }
  return res.status(404).json({
    data: [],
    message: "No metrics found",
  });
});

app.get("/api/metrics/week", (req, res) => {
  const metrics = getWeekMetrics();
  if (metrics) {
    return res.status(200).json({
      metrics,
    });
  }
  return res.status(404).json({ data: [], message: "No metrics found" });
});

app.get("/api/metrics/day", (req, res) => {
  console.log("HELLO?");
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const metric = getMetricByDay(currentYear, currentMonth, currentDay);
  console.log("HELLO?2");
  if (metric) {
    return res.status(200).json({
      metric,
    });
  }
  console.log("HELLO?3");
  return res.status(404).json({
    data: [],
    message: "No metrics found",
  });
});

app.get("/api/metrics/last", (req, res) => {
  const lastMetric = getLastMetric();

  if (lastMetric) {
    return res.status(200).json({
      lastMetric,
    });
  }
  return res.status(404).json({
    data: [],
    message: "No metrics found",
  });
});

app.post(
  "/api/metrics/upload",
  upload.single("filenameImage"),
  async (req, res) => {
    const { file } = req;
    console.log(req.body);
    console.log("Archivo:", file);
    if (!file) {
      return res.status(400).json({
        message: "File is required",
      });
    }
  }
);

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
});
