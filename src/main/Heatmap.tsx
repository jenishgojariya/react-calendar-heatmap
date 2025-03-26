import React, { FC } from "react";
import { Box, Grid, Paper, Tooltip, Typography } from "@mui/material";
import { HeatmapCalendarChartProps } from "./interface/heatmap";
import HorizontalScrollbar from "../components/HorizontalScrollbar";

const HeatmapCalendarChart: FC<HeatmapCalendarChartProps> = ({
  data,
  displayDate = true,
  mode = "light",
  bgColor = "#FFF",
}) => {
  if (!data || data.length === 0)
    return <Typography>No data available</Typography>;

  const groupedData = data.reduce((acc: Record<string, any>, item) => {
    const dateObj = new Date(item.date);
    const yearMonth = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    if (!acc[yearMonth]) {
      acc[yearMonth] = {
        label: dateObj.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        days: {} as Record<
          number,
          { date: string; net_profit_loss: number; weekday: number }
        >,
        firstDay: new Date(
          dateObj.getFullYear(),
          dateObj.getMonth(),
          1
        ).getDay(),
        totalDays: new Date(
          dateObj.getFullYear(),
          dateObj.getMonth() + 1,
          0
        ).getDate(),
      };
    }

    acc[yearMonth].days[dateObj.getDate()] = {
      date: item.date,
      net_profit_loss: item.net_profit_loss,
      weekday: dateObj.getDay(),
    };

    return acc;
  }, {} as Record<string, any>);

  const minPnl = Math.min(...data.map((item) => item.net_profit_loss));
  const maxPnl = Math.max(...data.map((item) => item.net_profit_loss));

  const getColor = (value: number | null) => {
    if (value === null) return mode === "dark" ? "#3e3960" : "#f2f2f2";

    const minOpacity = 0.15;
    const maxOpacity = 1;
    let opacity = Math.min(
      Math.abs(value) / Math.max(Math.abs(minPnl), Math.abs(maxPnl)),
      maxOpacity
    );
    opacity = Math.max(opacity, minOpacity);

    const green = mode === "dark" ? "rgba(0, 255, 100" : "rgba(0, 200, 0";
    const red = mode === "dark" ? "rgba(255, 80, 80" : "rgba(200, 0, 0";
    const newOpacity = mode === "dark" ? 1 - opacity : opacity;
    return value > 0 ? `${green}, ${newOpacity})` : `${red}, ${newOpacity})`;
  };

  return (
    <Box
      sx={{ backgroundColor: bgColor }}
      role="region"
      aria-label="Monthly trading summary"
    >
      <HorizontalScrollbar>
        {Object.entries(groupedData).map(
          ([month, { label, days, firstDay, totalDays }]) => {
            const monthDays = Array.from({ length: totalDays }, (_, i) => ({
              day: i + 1,
              data: days[i + 1] || null,
            }));

            const emptyStartSlots = firstDay;
            const totalCells =
              Math.ceil((monthDays.length + emptyStartSlots) / 7) * 7;
            const emptyEndSlots =
              totalCells - (monthDays.length + emptyStartSlots);

            return (
              <Paper
                key={month}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  minWidth: 275,
                  maxWidth: 275,
                  textAlign: "center",
                  boxShadow: 3,
                  bgcolor: mode === "light" ? "#FFF" : "#312D4B",
                  mb: 4,
                }}
                role="group"
                aria-labelledby={`month-label-${month}`}
              >
                <Typography
                  id={`month-label-${month}`}
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mb: 2, color: mode === "dark" ? "#D5D5D5" : "inherit" }}
                >
                  {label}
                </Typography>

                {/* Weekday Labels */}
                <Grid
                  container
                  spacing={1}
                  justifyContent="center"
                  sx={{ mb: 1 }}
                  role="row"
                >
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <Grid
                        item
                        key={day}
                        xs={1.7}
                        sx={{ fontSize: 12, fontWeight: 500, color: "gray" }}
                        role="columnheader"
                        aria-label={day}
                      >
                        {day}
                      </Grid>
                    )
                  )}
                </Grid>

                {/* Calendar Grid */}
                <Grid
                  container
                  spacing={0.5}
                  justifyContent="center"
                  role="grid"
                >
                  {/* Empty Start Slots */}
                  {Array(emptyStartSlots)
                    .fill(null)
                    .map((_, index) => (
                      <Grid
                        item
                        key={`empty-start-${index}`}
                        xs={1.7}
                        sx={{ height: 32 }}
                        aria-hidden="true"
                      />
                    ))}

                  {/* Calendar Days */}
                  {monthDays.map(({ day, data }) => (
                    <Grid item key={day} xs={1.7}>
                      <Tooltip
                        title={
                          data
                            ? `Date: ${data.date} P&L: ${data.net_profit_loss}`
                            : "No trade"
                        }
                        arrow
                        enterDelay={200}
                      >
                        <Box
                          role="button"
                          aria-label={
                            data
                              ? `Day ${day}, Profit/Loss: ${data.net_profit_loss}`
                              : `Day ${day}, No trade`
                          }
                          tabIndex={0}
                          sx={{
                            width: 28,
                            height: 28,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: getColor(
                              data ? data.net_profit_loss : null
                            ),
                            borderRadius: 1,
                            fontSize: 12,
                            marginBottom: "3px",
                            marginRight: "3px",
                            fontWeight: "bold",
                            color: mode === "dark" ? "#D5D5D5" : "inherit",
                            "&:hover": {
                              border: data ? "2px solid gray" : "none",
                            },
                          }}
                        >
                          {displayDate ? day : ""}
                        </Box>
                      </Tooltip>
                    </Grid>
                  ))}

                  {/* Empty End Slots */}
                  {Array(emptyEndSlots)
                    .fill(null)
                    .map((_, index) => (
                      <Grid
                        item
                        key={`empty-end-${index}`}
                        xs={1.7}
                        sx={{ height: 32 }}
                        aria-hidden="true"
                      />
                    ))}
                </Grid>
              </Paper>
            );
          }
        )}
      </HorizontalScrollbar>
    </Box>
  );
};

export { HeatmapCalendarChart };
