export interface TextInputProps {
  label: string;
  name: string;
  placeholder: string;
  ref: React.RefObject<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
