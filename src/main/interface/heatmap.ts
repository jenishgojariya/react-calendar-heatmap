interface TradeData {
  date: string;
  net_profit_loss: number;
}

export interface HeatmapCalendarChartProps {
  data: TradeData[];
  displayDate?: boolean;
}
