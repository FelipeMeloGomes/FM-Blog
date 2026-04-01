import type { IconType } from "react-icons";
import { Card, CardHeader, CardTitle } from "../ui/card";

interface MetricCardProps {
  title: string;
  value: number;
  icon: IconType;
  suffix?: string;
}

export const MetricCard = ({ title, value, icon: Icon, suffix }: MetricCardProps) => {
  const formattedValue = value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString();

  return (
    <Card className="flex-1 min-w-[140px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <div className="p-6 pt-0">
        <span className="text-2xl font-bold">
          {formattedValue}
          {suffix}
        </span>
      </div>
    </Card>
  );
};
