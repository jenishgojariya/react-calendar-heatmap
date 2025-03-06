# React Calendar Heatmap Chart

A simple and customizable **calendar heatmap chart** for React applications.

## 🚀 Installation

```sh
npm install react-calendar-heatmap-chart
```

## Usage

```jsx
import { HeatmapCalendarChart } from "react-calendar-heatmap-chart";

export default function Heatmap() {
  const data = [
    { date: "2025-01-06", net_profit_loss: -78 },
    { date: "2025-01-09", net_profit_loss: 79 },
    { date: "2025-01-27", net_profit_loss: -73 },
    { date: "2025-01-26", net_profit_loss: 82 },
    { date: "2025-01-08", net_profit_loss: 70 },
    { date: "2025-02-24", net_profit_loss: 58 },
    { date: "2025-02-08", net_profit_loss: -81 },
    { date: "2025-02-28", net_profit_loss: 16 },
    { date: "2025-02-04", net_profit_loss: 75 },
    { date: "2025-02-17", net_profit_loss: 15 },
  ];

  return <HeatmapCalendarChart data={data} displayDate={true} />;
}
```

## Props

| Prop          | Type    | Description                                                                   |
| ------------- | ------- | ----------------------------------------------------------------------------- |
| `data`        | Array   | Array of objects containing `date` (YYYY-MM-DD) and `net_profit_loss` values. |
| `displayDate` | Boolean | If `true`, the date will be displayed on hover.                               |

## 📸 Outputs

### Light Mode:

![Alt Lightmode](https://res.cloudinary.com/du6xxru25/image/upload/v1741261945/light_okam2w.png)

### Dark Mode:

![Alt Darkmode](https://res.cloudinary.com/du6xxru25/image/upload/v1741261940/dark_urzqoi.png)

## 📜 License

This project is licensed under the **MIT License**.

## Repository

[GitHub Repository](https://github.com/jenishgojariya/react-calendar-heatmap.git)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check issues and make pull requests.
