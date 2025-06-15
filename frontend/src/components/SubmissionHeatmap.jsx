import React, { useMemo } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Calendar } from "lucide-react";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { Tooltip } from "react-tooltip";

const SubmissionHeatmap = () => {
  const { submissions } = useSubmissionStore();

  // Prepare data for the heatmap
  const heatmapData = useMemo(() => {
    if (!submissions || !submissions.length) return [];

    // Group submissions by date
    const countsByDate = {};

    submissions.forEach((submission) => {
      const date = new Date(submission.createdAt);
      const dateKey = date.toISOString().split("T")[0];

      if (!countsByDate[dateKey]) {
        countsByDate[dateKey] = 0;
      }
      countsByDate[dateKey] += 1;
    });

    // Transform to array format for the heatmap
    return Object.keys(countsByDate).map((date) => ({
      date,
      count: countsByDate[date],
    }));
  }, [submissions]);

  // Calculate date ranges (last 6 months)
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 12);

  // Get max value for color scaling
  const maxCount = useMemo(() => {
    if (heatmapData.length === 0) return 0;
    return Math.max(...heatmapData.map((data) => data.count));
  }, [heatmapData]);

  return (
    <div className="profile-component-card p-6">
      <h2 className="profile-component-header flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-red-500" /> Submission Activity
      </h2>
      {submissions && submissions.length > 0 ? (
        <div className="submission-heatmap dark:bg-black/20 bg-white/20 p-4 rounded-lg border dark:border-white/10 border-black/10">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={heatmapData}
            classForValue={(value) => {
              if (!value || value.count === 0) {
                return "color-empty";
              }
              const intensity = Math.min(
                Math.ceil((value.count / Math.max(1, maxCount)) * 4),
                4
              );
              return `color-scale-${intensity}`;
            }}
            tooltipDataAttrs={(value) => {
              if (!value || !value.date) return null;
              return {
                "data-tooltip-id": "submission-tooltip",
                "data-tooltip-content": getTooltipContent(value),
              };
            }}
            showWeekdayLabels={true}
            horizontal={true}
            gutterSize={1}
          />
          <Tooltip
            id="submission-tooltip"
            className="submission-tooltip"
            place="top"
          />
        </div>
      ) : (
        <div className="bg-black/20 p-8 rounded-lg border border-white/10 text-center">
          <p className="text-white/60">No submission data available yet.</p>
          <p className="text-white/60 text-sm mt-2">
            Start solving problems to see your activity!
          </p>
        </div>
      )}

      {submissions && submissions.length > 0 && (
        <p className="text-xs text-white/60 text-center mt-2">
          Your submission activity over the last 12 months
        </p>
      )}
    </div>
  );
};

// Function to format tooltip content
const getTooltipContent = (value) => {
  if (!value || !value.date) return "";

  const date = new Date(value.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const count = value.count || 0;

  return `${formattedDate}: ${count} submission${count !== 1 ? "s" : ""}`;
};

export default SubmissionHeatmap;
