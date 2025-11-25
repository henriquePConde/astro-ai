export interface InputFormViewProps {
  input: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
  isHighlighted?: boolean;
}
