export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  alt: string;
}

export interface DashboardProps {
  createdBy?: string;
}