export interface FormButtonsProps {
  response: { loading: boolean | null; error?: string } | null;
  formError?: string;
}
