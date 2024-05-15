import { Metric } from "../../types";
import metricsData from "./metricsData.json";

const metrics = metricsData as Metric[];

export const getMetrics = () => metrics;

export const getMetricById = (id: number) =>
  metrics.find((metric) => metric.id === id);

export const getMetricByYear = (year: number) =>
  metrics.filter((metric) => metric.year === year);

export const getMetricByMonth = (year: number, month: number) =>
  metrics.filter((metric) => metric.year === year && metric.month === month);

export const getMetricByDay = (year: number, month: number, day: number) =>
  metrics.filter(
    (metric) =>
      metric.year === year && metric.month === month && metric.day === day
  );

export const getMetricByHour = (
  year: number,
  month: number,
  day: number,
  hour: number
) =>
  metrics.filter(
    (metric) =>
      metric.year === year &&
      metric.month === month &&
      metric.day === day &&
      metric.hour === hour
  );

export const getLastMetric = () => {
  // obtener el mas reciente (fecha) NO POR ID
  const lastMetric = metrics.sort((a, b) => {
    // Convertir las fechas a milisegundos desde el epoch
    const dateA = new Date(a.year, a.month - 1, a.day, a.hour).getTime();
    const dateB = new Date(b.year, b.month - 1, b.day, b.hour).getTime();

    // Ordenar por fecha descendente
    return dateB - dateA;
  })[0];
  console.log(lastMetric);
  return lastMetric;
};

export const getWeekMetrics = () => {
  const today = new Date();
  const weekMetrics = metrics
    .filter(
      (metric) =>
        metric.year === today.getFullYear() &&
        metric.month === today.getMonth() + 1 &&
        metric.day >= today.getDate() - 7
    )
    .map((metric) => metric);
  return weekMetrics;
};

export const addMetric = (filenameImage: string, humidity: number) => {
  const today = new Date();
  const newMetric: Metric = {
    id: metrics.length + 1,
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    hour: today.getHours(),
    filenameImage: filenameImage,
    humidity: humidity,
  };

  metrics.push(newMetric);
  return newMetric;
};
