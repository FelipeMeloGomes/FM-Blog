import { Button } from "../ui/button";

export interface EmptyStateProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex min-h-[350px] items-center justify-center">
      <div className="text-center space-y-4 max-w-sm animate-in fade-in zoom-in-95 duration-300">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/50">
          <div className="text-muted-foreground scale-110">{icon}</div>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {action && (
          <Button variant="default" onClick={action.onClick} className="mt-2">
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export { EmptyState };
