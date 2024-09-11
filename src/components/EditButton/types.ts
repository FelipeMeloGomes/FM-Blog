export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  alt: string;
}

export interface EditButtonProps extends ButtonProps {
  alt: string;
}
