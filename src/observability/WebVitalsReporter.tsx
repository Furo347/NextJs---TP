"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    console.group(`[web-vitals] ${metric.name}`);
    console.log("name:", metric.name);
    console.log("value:", metric.value);
    console.log("rating:", metric.rating);
    console.log("id:", metric.id);
    console.log("navigationType:", metric.navigationType);

    if ("entries" in metric) {
      console.log("entries:", metric.entries);
    }

    console.groupEnd();
  });

  return null;
}