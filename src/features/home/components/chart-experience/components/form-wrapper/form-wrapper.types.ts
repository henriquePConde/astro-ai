export interface FormWrapperViewProps {
  onFormSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}
