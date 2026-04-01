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
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center space-y-4 max-w-[320px]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <div className="text-muted-foreground">{icon}</div>
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        {action && (
          <Button variant="default" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export { EmptyState };
