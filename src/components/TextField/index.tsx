import { cn } from "../../lib/utils";

const TextField = ({
  title,
  paragraph,
  className,
}: {
  title: string;
  paragraph?: string;
  className?: string;
}) => (
  <div className={cn("text-center space-y-2", className)}>
    <h2 className="text-3xl font-heading font-bold text-foreground">{title}</h2>
    {paragraph && <p className="text-muted-foreground">{paragraph}</p>}
  </div>
);

export { TextField };
