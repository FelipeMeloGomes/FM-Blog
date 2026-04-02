import type { IconType } from "react-icons";

interface MetricCardProps {
  title: string;
  value: number;
  icon: IconType;
  suffix?: string;
}

export const MetricCard = ({ title, value, icon: Icon, suffix }: MetricCardProps) => {
  const formattedValue = value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString();

  return (
    <div className="relative overflow-hidden rounded-xl border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-border/50 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold tracking-tight">
            {formattedValue}
            {suffix}
          </p>
        </div>
        <div className="p-2.5 rounded-lg bg-secondary/50 group-hover:bg-primary/10 transition-colors duration-200">
          <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
